import {
  CampaignFormat,
  CampaignSummaryFragment,
  DisplayedMetricsFragment,
} from "@/graphql-client/graphql";
import BigNumber from "bignumber.js";
import { MessageDescriptor } from "@lingui/core";
import { msg } from "@lingui/macro";

type MetricType = "number" | "rate" | "usd";

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

// helpers to disable particular metrics for certain campaign formats
const isSearch = (campaign: CampaignSummaryFragment) => {
  return [CampaignFormat.Search, CampaignFormat.SearchHomepage].includes(
    campaign.format,
  );
};

export interface MetricDefinition {
  id: string;
  caption: MessageDescriptor;
  shortCaption?: MessageDescriptor;
  getValue: (metrics: DisplayedMetricsFragment) => BigNumber;
  type: MetricType;
  color: string;
  disableForCampaign?: (campaign: CampaignSummaryFragment) => boolean;

  // if true, the value is likely an underestimate and should be displayed as such
  isLikelyUnderestimate?: boolean;
}

const METRICS: MetricDefinition[] = [
  {
    id: "impression",
    caption: msg`Impressions`,
    getValue: (metrics) => BigNumber(metrics.impression),
    type: "number",
    color: colors[0],
  },
  {
    id: "click",
    caption: msg`Clicks`,
    getValue: (metrics) => BigNumber(metrics.click),
    type: "number",
    color: colors[1],
  },
  {
    id: "ctr",
    caption: msg`Click Through Rate`,
    shortCaption: msg`CTR`,
    getValue: (metrics) => BigNumber(metrics.rates.clickThrough),
    type: "rate",
    color: colors[2],
  },
  {
    id: "site-visit",
    caption: msg`Site Visits`,
    getValue: (metrics) => BigNumber(metrics.siteVisit),
    type: "number",
    color: colors[3],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
  },
  {
    id: "conversion",
    caption: msg`Conversions`,
    getValue: (metrics) => BigNumber(metrics.conversion),
    type: "number",
    color: colors[4],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
  },
  {
    id: "view-through-conversion",
    caption: msg`View-through Conversions`,
    getValue: (metrics) => BigNumber(metrics.viewThroughConversion),
    type: "number",
    color: colors[5],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
  },
  {
    id: "click-through-conversion",
    caption: msg`Click-through Conversions`,
    getValue: (metrics) => BigNumber(metrics.clickThroughConversion),
    type: "number",
    color: colors[6],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
  },
  {
    id: "conversion-rate",
    caption: msg`Conversion Rate`,
    getValue: (metrics) => BigNumber(metrics.rates.clickToConversion),
    type: "rate",
    color: colors[7],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
  },
  {
    id: "click-to-site-visit-rate",
    caption: msg`Site Visit Rate`,
    getValue: (metrics) => BigNumber(metrics.rates.clickToSiteVisit),
    type: "rate",
    color: colors[8],
    isLikelyUnderestimate: true,
    disableForCampaign: isSearch,
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
    disableForCampaign: isSearch,
  },
  {
    id: "upvote",
    caption: msg`Upvotes`,
    getValue: (metrics) => BigNumber(metrics.upvote),
    type: "number",
    color: colors[2],
    disableForCampaign: isSearch,
  },
  {
    id: "downvote",
    caption: msg`Downvotes`,
    getValue: (metrics) => BigNumber(metrics.downvote),
    type: "number",
    color: colors[3],
    disableForCampaign: isSearch,
  },
  {
    id: "dismiss",
    caption: msg`Dismissals`,
    getValue: (metrics) => BigNumber(metrics.dismiss),
    type: "number",
    color: colors[1],
    disableForCampaign: isSearch,
  },
  {
    id: "dismiss-rate",
    caption: msg`Dismissal Rate`,
    getValue: (metrics) => BigNumber(metrics.rates.impressionToDismiss),
    type: "rate",
    color: colors[4],
    disableForCampaign: isSearch,
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

export function isEnabledForCampaign(
  metric: MetricDefinition,
  campaign: CampaignSummaryFragment,
) {
  return !metric.disableForCampaign || !metric.disableForCampaign(campaign);
}
