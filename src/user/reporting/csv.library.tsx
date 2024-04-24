import { useCallback, useState } from "react";
import { buildAdServerEndpoint } from "@/util/environment";
import Papa from "papaparse";
import tweetnacl from "tweetnacl";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { t } from "@lingui/macro";

interface DownloadProps {
  onComplete?: () => void;
  onError?: () => void;
}

export function useDownloadCSV(props: DownloadProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { trackMatomoEvent } = useTrackMatomoEvent();

  const download = useCallback((campaignId: string, isVac: boolean) => {
    setLoading(true);
    setError(undefined);
    trackMatomoEvent(
      "report-download",
      `${isVac ? "vac" : "performance"}-report`,
    );

    const baseUrl = `/report/campaign/csv/${campaignId}`;
    fetch(buildAdServerEndpoint(isVac ? `${baseUrl}/vac` : baseUrl), {
      method: "GET",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "text/csv",
      },
    })
      .then((res) => {
        if (res.status !== 200) {
          const err = t`Unable to download CSV`;
          setError(err);
          throw new Error(err);
        }

        return res.blob();
      })
      .then((blob) => {
        const file = new Blob([blob], {
          type: "text/csv",
          endings: "transparent",
        });

        if (isVac) {
          return transformConversionEnvelope(file);
        }

        return Promise.resolve(file);
      })
      .then((file) => {
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", `${campaignId}.csv`);
        document.body.appendChild(link);
        link.click();
        if (props.onComplete) {
          props.onComplete();
        }
      })
      .catch((e) => {
        setError(e.message);
        trackMatomoEvent("report-download", `download-failed`);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { download, loading, error };
}

type Envelope = { ciphertext: string; epk: string; nonce: string };
async function transformConversionEnvelope(blob: Blob): Promise<Blob> {
  const ui8a = (s?: string | null) =>
    s ? Uint8Array.from(atob(s), (c) => c.charCodeAt(0)) : new Uint8Array();
  const privateKey = ui8a(
    document.getElementById("private-key")?.getAttribute("value"),
  );
  if (privateKey.byteLength === 0) {
    return Promise.resolve(blob);
  }

  const td = new TextDecoder();
  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const text = fileReader.result as string | null;
      if (text === null) {
        reject(new Error(t`No file result`));
        return;
      }

      try {
        Papa.parse(text, {
          header: true,
          transform(value: string, field: string) {
            if (field.includes("Conversion")) {
              const { ciphertext, nonce, epk }: Envelope = JSON.parse(value);
              const res = tweetnacl.box.open(
                ui8a(ciphertext),
                ui8a(nonce),
                ui8a(epk),
                privateKey,
              );
              return res
                ? td.decode(res.filter((v) => v !== 0x00))
                : t`Data not valid for this private key`;
            }

            return value;
          },
          complete(results) {
            const newCSV = Papa.unparse(results.data, {
              skipEmptyLines: "greedy",
            });
            privateKey.fill(0);
            resolve(new Blob([newCSV]));
          },
          error(error: Error) {
            reject(error);
          },
        });
      } catch (e) {
        console.error(e);
        reject(new Error(t`Unable to decrypt conversion data`));
      }
    };

    fileReader.readAsText(blob);
  });
}
