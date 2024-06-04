import * as Highcharts from "highcharts";
import { Alert, AlertTitle } from "@mui/material";
import dayjs from "dayjs";
import { Suspense } from "react";
import { FullScreenProgress } from "@/components/FullScreenProgress";
import { Trans } from "@lingui/macro";
import { CampaignAnalytics } from "@/routes/campaigns/analytics/CampaignAnalytics";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";

Highcharts.setOptions({
  lang: {
    thousandsSep: ",",
  },
});

export function AnalyticsOverview({ campaignOverview }: CampaignOverviewProps) {
  const campaignStartDate = dayjs(campaignOverview.startAt);
  const campaignStartFromNow = campaignStartDate.fromNow();

  if (campaignStartDate.isAfter()) {
    return (
      <Alert severity="warning">
        <AlertTitle>
          <Trans>Campaign has not started yet</Trans>
        </AlertTitle>
        <Trans>It is scheduled to start {campaignStartFromNow}.</Trans>
      </Alert>
    );
  }

  return (
    <Suspense fallback={<FullScreenProgress />}>
      <CampaignAnalytics campaignOverview={campaignOverview} />
    </Suspense>
  );
}
