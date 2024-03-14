import { getMetricListForCampaign } from "./metrics";
import { MetricSelector } from "./MetricSelector";
import { CampaignMetricDetailValuesFragment } from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";

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
