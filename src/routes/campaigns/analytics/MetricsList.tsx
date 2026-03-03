import { DisplayedMetricsFragment } from "@/graphql-client/graphql";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";
import { getMetricListForCampaign } from "./metrics";
import { MetricSelector } from "./MetricSelector";

interface Props extends CampaignOverviewProps {
  dataSource: DisplayedMetricsFragment | undefined;
}

export function MetricsList({ dataSource, campaignOverview }: Props) {
  const metrics = getMetricListForCampaign(campaignOverview);
  return metrics.map((metric, idx) => (
    <MetricSelector
      key={metric.id}
      metricDefinition={metric}
      dataSource={dataSource}
      isLast={idx === metrics.length - 1}
    />
  ));
}
