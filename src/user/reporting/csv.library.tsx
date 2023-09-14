import { useCallback, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import Papa from "papaparse";
import tweetnacl from "tweetnacl";
interface DownloadProps {
  onComplete?: () => void;
  onError?: () => void;
}

export function useDownloadCSV(props: DownloadProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const download = useCallback(
    (campaignId: string, isVac: boolean, privateKey?: string) => {
      setLoading(true);
      setError(undefined);

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
            const err = "Unable to download CSV";
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
            return transformConversionEnvelope(file, privateKey);
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
          if (props.onComplete) props.onComplete();
        })
        .catch((e) => {
          setError(e.message);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [],
  );

  return { download, loading, error };
}

type Envelope = { ciphertext: string; epk: string; nonce: string };
async function transformConversionEnvelope(
  blob: Blob,
  privateKey?: string,
): Promise<Blob> {
  const te = new TextEncoder();
  const td = new TextDecoder();
  const ui8a = (s: string) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

  return await new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = () => {
      const text = fileReader.result as string | null;
      if (text === null) {
        reject(new Error("No file Result"));
        return;
      }

      try {
        Papa.parse(text, {
          header: true,
          escapeChar: "\\",
          transform(value: string, field: string) {
            if (field === "Conversion Envelope" && privateKey) {
              const { ciphertext, nonce, epk }: Envelope = JSON.parse(value);
              const res = tweetnacl.box.open(
                ui8a(ciphertext),
                ui8a(nonce),
                ui8a(epk),
                ui8a(privateKey),
              );
              return res
                ? // eslint-disable-next-line no-control-regex
                  td.decode(res).replace(/\u0000/g, "")
                : "Data not valid for this private key";
            }

            return value;
          },
          complete(results) {
            const newCSV = Papa.unparse(results.data);
            const blob = te.encode(newCSV).buffer;
            resolve(new Blob([blob]));
          },
          error(error: Error) {
            reject(error);
          },
        });
      } catch (e) {
        console.error(e);
        reject(new Error("Unable to decrypt conversion data"));
      }
    };

    fileReader.readAsText(blob);
  });
}
