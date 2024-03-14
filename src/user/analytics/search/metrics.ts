import { msg } from "@lingui/macro";
import BigNumber from "bignumber.js";
import { CampaignMetricDetailValuesFragment } from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
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
    id: "site-visit",
    caption: msg`Site visits`,
    tooltip: msg`Counted if the user clicks an ad and spends at least 5 seconds on the advertiser's website, with the website open in an active browser tab. The 10 seconds must be spent on the site after arriving by clicking the ad link, and the tab must remain open and active the entire time for the visit to count.`,
    getValue: (metrics) => BigNumber(metrics.siteVisit),
    type: "number",
    color: colors[3],
  },
  {
    id: "conversion",
    caption: msg`Conversions`,
    tooltip: msg`Counted when a user reaches a designated conversion landing page`,
    getValue: (metrics) => BigNumber(metrics.conversion),
    type: "number",
    color: colors[4],
  },
  {
    id: "spend",
    caption: msg`Spend`,
    getValue: (metrics) => BigNumber(metrics.spendUsd),
    type: "usd",
    color: colors[9],
  },
  {
    id: "cpa",
    caption: msg`Cost per Acquisition`,
    shortCaption: msg`CPA`,
    getValue: (metrics) => BigNumber(metrics.rates.costPerAcquisition),
    type: "usd",
    color: colors[0],
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
