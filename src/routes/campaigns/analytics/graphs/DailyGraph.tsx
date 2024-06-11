import { DailyMetricValuesFragment } from "@/graphql-client/graphql";
import { useMetricSelection } from "../hooks";
import { makeLineChartSeries } from "./series";
import { GraphSkeleton } from "./GraphSkeleton";
import { OverTimeGraph } from "./OverTimeGraph";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { isEnabledForCampaign } from "@/routes/campaigns/analytics/metrics";

interface Props extends CampaignOverviewProps {
  dataSource: DailyMetricValuesFragment[] | undefined;
}

export function DailyGraph({ campaignOverview, dataSource }: Props) {
  const { selectedMetrics } = useMetricSelection();

  if (!dataSource) {
    return <GraphSkeleton />;
  }

  const rawData = dataSource.map((d) => ({
    timestamp: d.dimensions.day,
    metrics: d.metrics,
  }));

  const series = selectedMetrics
    .filter((m) => isEnabledForCampaign(m, campaignOverview))
    .map((metric) => makeLineChartSeries(metric, rawData, "day"));

  return <OverTimeGraph series={series} />;
}
