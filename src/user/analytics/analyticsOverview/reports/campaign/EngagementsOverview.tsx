import { Alert, Box, Divider, Skeleton } from "@mui/material";
import { useState } from "react";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
} from "graphql/analytics-overview.generated";
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
import { ApolloError } from "@apollo/client";
import { usePersistMetricFilter } from "user/analytics/analyticsOverview/hooks/usePersistMetricFilter";
import { HighchartsWrapper } from "user/analytics/analyticsOverview/components/HighchartsWrapper";
import { msg, Trans } from "@lingui/macro";

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
  const [grouping, setGrouping] = useState("daily");
  const { metrics, setMetric } = usePersistMetricFilter({
    campaignId: campaign?.id,
    hasConversions: campaign?.adSets.some(
      (a) => a.conversions && a.conversions.length,
    ),
  });

  if (error) {
    return (
      <ErrorDetail
        error={error}
        additionalDetails={msg`Unable to retrieve reporting data for this Campaign.`}
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
        <Trans>
          Please ask your Account Manager for reports on campaigns of this
          format.
        </Trans>
      </Alert>
    );
  }

  if (!engagements || engagements.length === 0) {
    return <ReportingNotReady campaignName={campaign.name} />;
  }

  const processedData = processData(engagements, metrics, grouping);
  const processedStats = processStats(engagements);
  const options = prepareChart(metrics, processedData);

  if (!processedStats) {
    return <ReportingNotReady campaignName={campaign.name} />;
  }

  return (
    <Box display="flex" flexDirection="row" gap="5px">
      <MetricFilter
        processedStats={processedStats}
        metrics={metrics}
        onSetMetric={setMetric}
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
          <HighchartsWrapper options={options} />
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

function ReportingNotReady(props: { campaignName: string }) {
  return (
    <Alert severity="info" sx={{ mt: 2, mb: 3 }}>
      <Trans>
        Reporting not available yet for <strong>{props.campaignName}</strong>.
      </Trans>
    </Alert>
  );
}
