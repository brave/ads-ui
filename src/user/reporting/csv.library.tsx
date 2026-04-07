import { CampaignFormat } from "@/graphql-client/graphql";
import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { buildAdServerV3Endpoint } from "@/util/environment";
import { useCallback, useState } from "react";

export type SupportedReportFormat =
  | CampaignFormat.PushNotification
  | CampaignFormat.NtpSi
  | CampaignFormat.Search;

const DIMENSIONS_BY_FORMAT: Record<SupportedReportFormat, string[]> = {
  [CampaignFormat.PushNotification]: [
    "day",
    "advertiser_id",
    "advertiser_name",
    "campaign_id",
    "campaign_name",
    "adset_id",
    "adset_name",
    "ad_id",
    "creative_title",
    "creative_body",
    "target_url",
    "country",
    "os",
  ],
  [CampaignFormat.NtpSi]: [
    "advertiser_id",
    "advertiser_name",
    "campaign_id",
    "campaign_name",
    "adset_id",
    "adset_name",
    "ad_id",
    "target_url",
    "country",
    "os",
  ],
  [CampaignFormat.Search]: [
    "day",
    "advertiser_id",
    "advertiser_name",
    "campaign_id",
    "campaign_name",
    "adset_id",
    "adset_name",
    "ad_id",
    "target_url",
    "country",
    "os",
  ],
};

const METRICS_BY_FORMAT: Record<SupportedReportFormat, string[]> = {
  [CampaignFormat.PushNotification]: [
    "impressions",
    "clicks",
    "site_visits",
    "billable_spend_usd",
    "click_through_conversions",
    "view_through_conversions",
  ],
  [CampaignFormat.NtpSi]: ["impressions", "clicks", "unique_impressions"],
  [CampaignFormat.Search]: [
    "impressions",
    "clicks",
    "billable_spend_usd",
    "click_through_conversions",
  ],
};

export function isSupportedReportFormat(
  format: CampaignFormat,
): format is SupportedReportFormat {
  return format in DIMENSIONS_BY_FORMAT;
}

function buildReportUrl(
  campaignId: string,
  format: SupportedReportFormat,
): string {
  const dimensions = DIMENSIONS_BY_FORMAT[format];
  const metrics = METRICS_BY_FORMAT[format];
  const params = new URLSearchParams();
  params.set("dimensions", dimensions.join(","));
  params.set("metrics", metrics.join(","));
  return buildAdServerV3Endpoint(
    `/report/campaign/csv/${campaignId}?${params.toString()}`,
  );
}

interface DownloadProps {
  onComplete?: () => void;
  onError?: () => void;
  format: SupportedReportFormat;
}

export function useDownloadCSV(props: DownloadProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>();
  const { trackMatomoEvent } = useTrackMatomoEvent();

  const { onComplete, format } = props;

  const download = useCallback(
    (campaignId: string) => {
      setLoading(true);
      setError(undefined);
      trackMatomoEvent("report-download", "performance-report");

      fetch(buildReportUrl(campaignId, format), {
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
    [onComplete, trackMatomoEvent, format],
  );

  return { download, loading, error };
}
