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
  const b64 = (i: string) => te.encode(atob(i));

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
          transform(value: string, field: string) {
            if (field === "Conversion Envelope" && privateKey) {
              const { ciphertext, nonce, epk }: Envelope = JSON.parse(value);
              const res = tweetnacl.box.open(
                b64(ciphertext),
                b64(nonce),
                b64(epk),
                b64(privateKey),
              );
              return res
                ? td.decode(res)
                : "Data not valid for this private key";
            }

            return value;
          },
          complete(results, file) {
            console.log("Parsing complete:", results, file);
            resolve(blob);
            // Papa.unparse()
          },
        });
      } catch (e) {
        console.log(e);
        reject(new Error("Unable to decrypt conversion data"));
      }
    };

    fileReader.readAsText(blob);
  });
}
