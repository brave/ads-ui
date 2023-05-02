import { Box, Tab, Tabs } from "@mui/material";
import HighchartsReact from "highcharts-react-official";
import * as Highcharts from "highcharts";
import React, { useState } from "react";
import { EngagementFragment } from "graphql/analytics-overview.generated";
import { Metrics } from "../../types";
import { prepareChart, processData } from "../../lib/overview.library";
import { CampaignFragment } from "graphql/campaign.generated";
import { CampaignFormat } from "graphql/types";

interface Props {
  engagements: EngagementFragment[];
  campaign: CampaignFragment;
}

export function DailyCampaignOverview({ engagements, campaign }: Props) {
  const [type, setType] = useState("views");
  const initialMetric: Metrics = { metric1: "views", metric2: "conversions" };
  const [metrics, setMetrics] = useState<Metrics>({
    metric1: "views",
    metric2: "conversions",
  });

  const processedData = processData(engagements ?? [], metrics, "day");
  const options = prepareChart(metrics, processedData);

  const onChange = (type: string) => {
    setType(type);
    let metric: Metrics;
    switch (type) {
      case "spend":
        metric = { metric1: "spend", metric2: "cpa" };
        break;
      case "clicks":
        metric = { metric1: "clicks", metric2: "landings" };
        break;
      case "ctr":
        metric = { metric1: "ctr" };
        break;
      case "dismissRate":
        metric = { metric1: "dismissRate" };
        break;
      case "landingRate":
        metric = { metric1: "landingRate" };
        break;
      case "visitRate":
        metric = { metric1: "visitRate" };
        break;
      default:
        metric = initialMetric;
    }
    setMetrics(metric);
  };

  return (
    <Box border="1px solid #ededed" borderRadius="4px">
      <Box
        width="100%"
        height="50px"
        bgcolor="white"
        borderBottom="1px solid #ededed"
        display="flex"
        justifyContent="center"
      >
        <Tabs
          value={type}
          onChange={(evt, v) => onChange(v)}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab value="views" label="Impressions & Conversions" />
          <Tab value="clicks" label="Clicks & 10 second visits" />
          {campaign.format !== CampaignFormat.NtpSi && (
            <Tab value="spend" label="Spend & CPA" />
          )}
          <Tab value="ctr" label="CTR" />
          <Tab value="landingRate" label="Click to 10 second visit rate" />
          <Tab value="visitRate" label="10 second visit rate" />
        </Tabs>
      </Box>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
}
