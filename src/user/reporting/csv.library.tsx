import { useCallback, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";
import Papa from "papaparse";
import tweetnacl from "tweetnacl";
import { uInt8Array } from "util/uInt8Array";
interface DownloadProps {
  onComplete?: () => void;
  onError?: () => void;
}

export function useDownloadCSV(props: DownloadProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const download = useCallback(
    (campaignId: string, isVac: boolean, privateKey?: Uint8Array) => {
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
          privateKey?.fill(0);
        });
    },
    [],
  );

  return { download, loading, error };
}

type Envelope = { ciphertext: string; epk: string; nonce: string };
async function transformConversionEnvelope(
  blob: Blob,
  privateKey?: Uint8Array,
): Promise<Blob> {
  if (!privateKey) {
    return Promise.resolve(blob);
  }

  const td = new TextDecoder();

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
            if (field.includes("Conversion")) {
              const { ciphertext, nonce, epk }: Envelope = JSON.parse(value);
              const res = tweetnacl.box.open(
                uInt8Array(ciphertext),
                uInt8Array(nonce),
                uInt8Array(epk),
                privateKey,
              );
              return res
                ? td.decode(res.filter((v) => v !== 0x00))
                : "Data not valid for this private key";
            }

            return value;
          },
          complete(results) {
            const newCSV = Papa.unparse(results.data, {
              skipEmptyLines: "greedy",
            });
            resolve(new Blob([newCSV]));
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
