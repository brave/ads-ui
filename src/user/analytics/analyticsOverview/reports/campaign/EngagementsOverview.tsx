import { Alert, Box, Divider, Skeleton } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, { useState } from "react";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
} from "graphql/analytics-overview.generated";
import { Metrics, StatsMetric } from "../../types";
import {
  prepareChart,
  processData,
  processStats,
} from "../../lib/overview.library";
import MetricFilter from "../../components/MetricFilter";
import EngagementHeader from "../../components/EngagementHeader";
import LiveFeed from "../../components/LiveFeed";
import { CampaignFormat } from "graphql/types";
import { ErrorDetail } from "components/Error/ErrorDetail";
import { DashboardButton } from "components/Button/DashboardButton";
import { ApolloError } from "@apollo/client";

interface Props {
  loading: boolean;
  campaign?: Omit<CampaignWithEngagementsFragment, "engagements"> | null;
  engagements?: EngagementFragment[];
  error?: ApolloError;
}

export function EngagementsOverview({
  engagements,
  campaign,
  error,
  loading,
}: Props) {
  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails="Unable to retrieve reporting data for this Campaign."
      />
    );
  }

  if (loading) {
    return (
      <Box padding={2}>
        <Skeleton variant="rounded" height="250px" />
      </Box>
    );
  }

  if (!campaign) {
    return null;
  }

  if (campaign?.format === CampaignFormat.NtpSi) {
    return (
      <Alert severity="info" sx={{ mt: 2, mb: 2 }}>
        Please ask your Account Manager for reports on campaigns of this format.
      </Alert>
    );
  }

  if (!engagements || engagements.length === 0) {
    return (
      <Box p={3}>
        <DashboardButton />
        <Alert severity="info" sx={{ mt: 2, mb: 10 }}>
          Reporting not available yet for <strong>{campaign.name}</strong>.
        </Alert>
      </Box>
    );
  }

  const [grouping, setGrouping] = useState("daily");

  const [metrics, setMetrics] = useState<Metrics>({
    metric1: "views",
    metric2: "clicks",
    metric3: "conversions",
    metric4: "landings",
  });

  const setActiveMetric = (key: keyof Metrics, value: keyof StatsMetric) => {
    const metricsCopy = metrics;
    metricsCopy[key] = value;
    setMetrics({ ...metricsCopy });
  };

  const processedData = processData(engagements, metrics, grouping);
  const processedStats = processStats(engagements);
  const options = prepareChart(metrics, processedData);

  return (
    <Box display="flex" flexDirection="row">
      <MetricFilter
        processedStats={processedStats}
        metrics={metrics}
        onSetMetric={setActiveMetric}
      />
      <Box flexGrow={1} bgcolor="#fff" sx={{ borderRadius: "12px" }}>
        <EngagementHeader
          campaign={campaign}
          onSetGroup={setGrouping}
          grouping={grouping}
        />
        <Box
          paddingLeft="28px"
          paddingRight="28px"
          paddingTop="14px"
          paddingBottom="14px"
        >
          <Box>
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Box>
        </Box>

        <Divider />
        <LiveFeed
          overview={{
            currency: campaign.currency,
            budget: campaign.budget,
            name: campaign.name,
            state: campaign.state,
            id: campaign.id,
          }}
          processed={processedStats}
        />
      </Box>
    </Box>
  );
}
