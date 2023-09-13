import { useCallback, useState } from "react";
import { buildAdServerEndpoint } from "util/environment";

interface DownloadProps {
  onComplete?: () => void;
}

export function useDownloadCSV(props: DownloadProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();

  const download = useCallback((campaignId: string, isVac: boolean) => {
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
        const fileURL = URL.createObjectURL(file);
        const link = document.createElement("a");
        link.href = fileURL;
        link.setAttribute("download", `${campaignId}.csv`);
        document.body.appendChild(link);
        link.click();
        if (props.onComplete) props.onComplete();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { download, loading, error };
}
