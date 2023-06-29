import { Box, CardContent, Divider, Stack, Typography } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, { useState } from "react";
import _ from "lodash";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
} from "graphql/analytics-overview.generated";
import { AdSetFragment } from "graphql/ad-set.generated";
import {
  EngagementChartType,
  Metrics,
  OverviewDetail,
  StatsMetric,
} from "../../types";
import {
  prepareChart,
  processData,
  processStats,
} from "../../lib/overview.library";
import MetricFilter from "../../components/MetricFilter";
import EngagementHeader from "../../components/EngagementHeader";
import LiveFeed from "../../components/LiveFeed";
import { CampaignFormat } from "graphql/types";

interface Props {
  engagements: EngagementFragment[];
  campaign: Omit<CampaignWithEngagementsFragment, "engagements">;
}

export function EngagementsOverview({ engagements, campaign }: Props) {
  const [grouping, setGrouping] = useState("daily");
  const isNtp = campaign.format == CampaignFormat.NtpSi;

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
    <Stack direction="row">
      <MetricFilter
        processedStats={processedStats}
        metrics={metrics}
        onSetMetric={setActiveMetric}
        isNtp={isNtp}
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
          <HighchartsReact highcharts={Highcharts} options={options} />
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
          isNtp={isNtp}
        />
      </Box>
    </Stack>
  );
}
