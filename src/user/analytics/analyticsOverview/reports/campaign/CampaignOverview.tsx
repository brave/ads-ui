import { Box } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, { useState } from "react";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
} from "../../../../../graphql/analytics-overview.generated";
import { Metrics } from "../../types";
import {
  prepareChart,
  processData,
  processStats,
} from "../../lib/overview.library";
import MetricFilter from "../../components/MetricFilter";
import EngagementHeader from "../../components/EngagementHeader";
import LiveFeed from "../../components/LiveFeed";

interface Props {
  engagements: EngagementFragment[];
  campaign: Omit<CampaignWithEngagementsFragment, "engagements">;
}

export function CampaignOverview({ engagements, campaign }: Props) {
  const [grouping, setGrouping] = useState("daily");

  const [metrics, setMetrics] = useState<Metrics>({
    metric1: "views",
    metric2: "clicks",
    metric3: "dismissals",
    metric4: "landings",
  });

  const setActiveMetric = (key: keyof Metrics, value: string) => {
    const metricsCopy = metrics;
    metricsCopy[key] = value;
    setMetrics({ ...metricsCopy });
  };

  const processedData = processData(engagements ?? [], metrics, grouping);
  const processedStats = processStats(engagements ?? []);
  const options = prepareChart(metrics, processedData);

  return (
    <Box display="flex">
      {/* Left Side (Metrics + Chart) */}
      <Box width="75%">
        <MetricFilter
          processedStats={processedStats}
          metrics={metrics}
          onSetMetric={setActiveMetric}
        />

        <Box border="1px solid #ededed" borderRadius="4px" height="450px">
          <EngagementHeader onClick={setGrouping} grouping={grouping} />
          <Box
            paddingLeft="28px"
            paddingRight="28px"
            paddingTop="14px"
            paddingBottom="14px"
          >
            <HighchartsReact highcharts={Highcharts} options={options} />
          </Box>
        </Box>
      </Box>

      {/* Right Side (Live Feed) */}
      <LiveFeed
        cost={{
          currency: campaign.currency,
          budget: campaign.budget,
        }}
        processed={processedStats}
        state={campaign.state}
      />
    </Box>
  );
}
