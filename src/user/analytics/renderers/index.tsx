import React from "react";
import { Box, Skeleton } from "@mui/material";
import { renderMonetaryAmount } from "components/EnhancedTable/renderers";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { CampaignFormat } from "graphql/types";
import { StatsMetric } from "user/analytics/analyticsOverview/types";

export type EngagementOverview = {
  campaignId: string;
  click: number;
  date: Date;
  landed: number;
  spend: number;
  view: number;
};

export function engagementValue(e: EngagementOverview[]): EngagementOverview {
  return e.reduce((a, b) => ({
    view: a.view + b.view,
    spend: a.spend + b.spend,
    click: a.click + b.click,
    landed: a.landed + b.landed,
    campaignId: a.campaignId,
    date: a.date,
  }));
}

export const renderEngagementCell = (
  loading: boolean,
  fragment: CampaignSummaryFragment,
  type: keyof EngagementOverview,
  map?: Map<string, EngagementOverview>
) => {
  if (loading) {
    return <Skeleton />;
  }

  const val = map?.get(fragment.id);
  if (type === "spend") {
    const s = val?.spend ?? fragment.spent;
    const realSpend = fragment.format === CampaignFormat.NtpSi ? 1 : s;
    return renderMonetaryAmount(realSpend, fragment.currency);
  }

  if (!map || !val) {
    return <Box>N/A</Box>;
  }

  return <Box>{val[type].toLocaleString()}</Box>;
};

export const renderStatsCell = (
  loading: boolean,
  type: keyof StatsMetric,
  val?: StatsMetric,
  currency?: string
) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!val) {
    return <Box>N/A</Box>;
  }

  if (type === "spend") {
    const c = currency ? currency : "USD";
    return renderMonetaryAmount(val.spend, c);
  }

  return <Box>{val[type].toLocaleString()}</Box>;
};
