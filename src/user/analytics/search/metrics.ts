import { msg } from "@lingui/macro";
import BigNumber from "bignumber.js";
import { CampaignMetricDetailValuesFragment } from "@/graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "@/graphql/campaign.generated";
import { MessageDescriptor } from "@lingui/core";

export type MetricType = "number" | "rate" | "usd";

const colors = [
  "#2caffe",
  "#544fc5",
  "#00e272",
  "#fe6a35",
  "#6b8abc",
  "#d568fb",
  "#2ee0ca",
  "#fa4b42",
  "#feb56a",
  "#91e8e1",
] as const;

export interface MetricDefinition {
  id: string;
  caption: MessageDescriptor;
  shortCaption?: MessageDescriptor;
  tooltip?: MessageDescriptor;
  getValue: (metrics: CampaignMetricDetailValuesFragment) => BigNumber;
  type: MetricType;
  color: string;
  disableForCampaign?: (campaign: CampaignSummaryFragment) => boolean;
}

export const METRICS: MetricDefinition[] = [
  {
    id: "impression",
    caption: msg`Impressions`,
    tooltip: msg`Counted when an ad is displayed on screen for a minimum of one second`,
    getValue: (metrics) => BigNumber(metrics.impression),
    type: "number",
    color: colors[0],
  },
  {
    id: "click",
    caption: msg`Clicks`,
    tooltip: msg`Counted when a user clicks on the ad. Does not include clicks to dismiss`,
    getValue: (metrics) => BigNumber(metrics.click),
    type: "number",
    color: colors[1],
  },
  {
    id: "ctr",
    caption: msg`Click Through Rate`,
    shortCaption: msg`CTR`,
    tooltip: msg`The rate at which users clicked in correlation to their impressions`,
    getValue: (metrics) => BigNumber(metrics.rates.clickThrough),
    type: "rate",
    color: colors[2],
  },
  {
    id: "spend",
    caption: msg`Spend`,
    getValue: (metrics) => BigNumber(metrics.spendUsd),
    type: "usd",
    color: colors[9],
  },
];

const metricLookup = new Map<string, MetricDefinition>(
  METRICS.map((m) => [m.id, m]),
);

export function getMetricDefinition(id: string): MetricDefinition | undefined {
  return metricLookup.get(id);
}

export function getMetricListForCampaign(
  campaign: CampaignSummaryFragment,
): readonly MetricDefinition[] {
  return METRICS.filter(
    (m) => !m.disableForCampaign || !m.disableForCampaign(campaign),
  );
}
