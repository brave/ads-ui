import { Box, CardContent } from "@mui/material";
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
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  engagements: EngagementFragment[];
  campaign: Omit<CampaignWithEngagementsFragment, "engagements">;
  adSets: AdSetFragment[];
}

export function EngagementsOverview({ engagements, campaign, adSets }: Props) {
  const campaignOverview = {
    name: campaign.name,
    state: campaign.state,
    id: campaign.id,
  };
  const [grouping, setGrouping] = useState("daily");
  const [engagementType, setEngagementType] =
    useState<EngagementChartType>("campaign");
  const [overview, setOverview] = useState<OverviewDetail>(campaignOverview);
  const isNtp = campaign.format == CampaignFormat.NtpSi;

  // Only care about name / id / state
  const mappedAdSets: OverviewDetail[] = _.map(adSets, (i) =>
    _.pick(i, ["id", "name", "state"])
  );
  const mappedAds: OverviewDetail[] = _.uniqBy(
    _.map(_.flatMap(adSets, "ads"), (i) => ({
      id: i.creative.id,
      name: i.creative.name,
      state: i.creative.state,
    })),
    "id"
  );

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

  const setActiveDataOverview = (type: EngagementChartType, id?: string) => {
    if (type === "campaign") {
      setOverview(campaignOverview);
      return engagements;
    }

    const filterId = !!id ? id : engagements[0][`${type}id`];
    const activeOverviewList =
      type === "creativeset" ? mappedAdSets : mappedAds;
    const detail = activeOverviewList.find((o) => o.id === filterId);
    if (detail) {
      setOverview({ id: detail.id, state: detail.state, name: detail.name });
    }
  };

  const filtered =
    engagementType === "campaign"
      ? engagements
      : engagements.filter((e) => e[`${engagementType}id`] === overview.id);
  const processedData = processData(filtered, metrics, grouping);
  const processedStats = processStats(filtered);
  const options = prepareChart(metrics, processedData);

  return (
    <CardContainer header={`${campaign.name}: Overview`}>
      <Box display="flex">
        <Box width="75%">
          <MetricFilter
            processedStats={processedStats}
            metrics={metrics}
            onSetMetric={setActiveMetric}
            isNtp={isNtp}
          />

          <Box border="1px solid #ededed" borderRadius="4px" height="450px">
            <EngagementHeader
              onSetGroup={setGrouping}
              grouping={grouping}
              onSetEngagement={(t: EngagementChartType) => {
                setEngagementType(t);
                setActiveDataOverview(t);
              }}
              engagement={engagementType}
            />
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
          overview={{
            currency: campaign.currency,
            budget: campaign.budget,
            ...overview,
          }}
          onSelect={(id: string) => {
            setActiveDataOverview(engagementType, id);
          }}
          uniqueEngagements={
            engagementType === "creative" ? mappedAds : mappedAdSets
          }
          engagementType={engagementType}
          processed={processedStats}
          isNtp={isNtp}
        />
      </Box>
    </CardContainer>
  );
}
