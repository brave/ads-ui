import { FullScreenProgress } from "@/components/FullScreenProgress";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { CampaignAnalytics } from "@/routes/campaigns/analytics/CampaignAnalytics";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { Alert, AlertTitle } from "@mui/material";
import dayjs from "dayjs";
import * as Highcharts from "highcharts";
import { Suspense } from "react";

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

export function AnalyticsOverview({ campaignOverview }: CampaignOverviewProps) {
  useTrackMatomoPageView({ documentTitle: "Campaign Report View: V2" });
  const campaignStartDate = dayjs(campaignOverview.startAt);
  const campaignStartFromNow = campaignStartDate.fromNow();

  if (campaignStartDate.isAfter()) {
    return (
      <Alert severity="warning">
        <AlertTitle>Campaign has not started yet</AlertTitle>
        It is scheduled to start {campaignStartFromNow}.
      </Alert>
    );
  }

  return (
    <Suspense fallback={<FullScreenProgress />}>
      <CampaignAnalytics campaignOverview={campaignOverview} />
    </Suspense>
  );
}
