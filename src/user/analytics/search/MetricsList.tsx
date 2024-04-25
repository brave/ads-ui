import {
  CampaignSummaryFragment,
  CampaignMetricDetailValuesFragment,
} from "@/graphql-client/graphql";
import { getMetricListForCampaign } from "./metrics";
import { MetricSelector } from "./MetricSelector";

interface Props {
  campaign: CampaignSummaryFragment;
  dataSource: CampaignMetricDetailValuesFragment | undefined;
}

export function MetricsList({ dataSource, campaign }: Props) {
  const metrics = getMetricListForCampaign(campaign);
  return metrics.map((metric, idx) => (
    <MetricSelector
      key={metric.id}
      metricDefinition={metric}
      dataSource={dataSource}
      isLast={idx === metrics.length - 1}
    />
  ));
}
