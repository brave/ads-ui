import { useCallback, useState } from "react";
import { buildAdServerEndpoint } from "@/util/environment";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";

interface DownloadProps {
  onComplete?: () => void;
  onError?: () => void;
}

export function useDownloadCSV(props: DownloadProps = {}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { trackMatomoEvent } = useTrackMatomoEvent();

  const { onComplete } = props;

  const download = useCallback(
    (campaignId: string) => {
      setLoading(true);
      setError(undefined);
      trackMatomoEvent("report-download", "performance-report");

      const baseUrl = `/report/campaign/csv/${campaignId}`;
      fetch(buildAdServerEndpoint(baseUrl), {
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

          return Promise.resolve(file);
        })
        .then((file) => {
          const fileURL = URL.createObjectURL(file);
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", `${campaignId}.csv`);
          document.body.appendChild(link);
          link.click();
          if (onComplete) {
            onComplete();
          }
        })
        .catch((e) => {
          setError(e.message);
          trackMatomoEvent("report-download", `download-failed`);
        })
        .finally(() => {
          setLoading(false);
        });
    },
    [onComplete, trackMatomoEvent],
  );

  return { download, loading, error };
}
