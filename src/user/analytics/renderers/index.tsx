import React from "react";
import { Box, Skeleton, Typography } from "@mui/material";
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
  map?: Map<string, EngagementOverview>,
) => {
  if (loading) {
    return <Skeleton />;
  }

  if (fragment.format === CampaignFormat.NtpSi) {
    return <Typography>-</Typography>;
  }

  const val = map?.get(fragment.id);
  if (type === "spend") {
    const s = val?.spend ?? fragment.spent;
    return renderMonetaryAmount(s, fragment.currency);
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
  currency?: string,
) => {
  if (loading) {
    return <Skeleton />;
  }

  if (!val) {
    return <Box>N/A</Box>;
  }

  if (val[type] <= 0) {
    return <Box>-</Box>;
  }

  switch (type) {
    case "ctr":
    case "convRate":
    case "dismissRate":
    case "landingRate":
    case "visitRate":
      return <Box>{val[type].toLocaleString()}%</Box>;
    case "spend":
    case "cpa":
      return renderMonetaryAmount(val.spend, currency ?? "USD");
    default:
      return <Box>{val[type].toLocaleString()}</Box>;
  }
};
