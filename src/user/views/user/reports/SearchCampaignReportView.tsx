import { msg } from "@lingui/macro";
import { Box } from "@mui/material";
import { DashboardButton } from "components/Button/DashboardButton";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { useFetchDailyMetricsForCampaignQuery } from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { useState } from "react";
import { MetricsList } from "user/analytics/search/MetricsList";
import { OverTimeGraph } from "user/analytics/search/OverTimeGraph";
import { useMetricSelection } from "user/analytics/search/hooks";

interface Props {
  campaignSummary: CampaignSummaryFragment;
}

export function SearchCampaignReportView({ campaignSummary }: Props) {
  const { forceDefaultMetricSelection } = useMetricSelection();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const { data, error } = useFetchDailyMetricsForCampaignQuery({
    variables: {
      campaignId: campaignSummary.id,
    },
  });

  if (isFirstLoad) {
    setIsFirstLoad(false);
    forceDefaultMetricSelection();
  }

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to retrieve reporting data for this Campaign.`}
      />
    );
  }

  return (
    <>
      <DashboardButton />

      <Box
        // and these control the layout of this elements contained within this box
        //  see https://css-tricks.com/snippets/css/complete-guide-grid/
        // on small screens the grid will have a single column, so the metrics are listed below
        // the graph. On larger screens the metrics are in a column to the right of the graph
        // (slightly more spaced out on even bigger screens).
        display="grid"
        gap={1}
        gridTemplateColumns={{ xs: "1fr", md: "300px 1fr", lg: "350px 1fr" }}
        gridTemplateAreas={{
          xs: `
        "graph"
        "metrics"
        `,
          md: `
          "metrics graph"
        `,
        }}
      >
        <Box height="500px" gridArea="graph" bgcolor="pink">
          <OverTimeGraph dataSource={data?.performance?.values} />
        </Box>

        <Box gridArea="metrics" sx={{ overflowY: "scroll" }}>
          <MetricsList
            dataSource={data?.performance?.total?.metrics}
            campaign={campaignSummary}
          />
        </Box>
      </Box>
    </>
  );
}
