import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdFragment } from "graphql/ad-set.generated";
import { CampaignSource } from "graphql/types";
import { CampaignAdsFragment } from "graphql/campaign.generated";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import React from "react";
import { renderStatsCell } from "user/analytics/renderers";

interface Props {
  campaign?: CampaignAdsFragment | null;
  loading: boolean;
  engagements: Map<string, StatsMetric>;
}

export type AdDetails = AdFragment & {
  adSetName: string;
  campaignName: string;
  campaignEnd: string;
  campaignSource: CampaignSource;
  advertiserId: string;
  campaignId: string;
};

export function AdList({ campaign, loading, engagements }: Props) {
  const adSets = campaign?.adSets?.map((c) => ({
    ads: (c.ads ?? [])
      .filter((ad) => ad.state !== "deleted")
      .map((ad) => {
        const detail: AdDetails = {
          ...ad,
          state: isAfterEndDate(campaign?.endAt) ? "completed" : c.state,
          adSetName: c.name || c.id.substring(0, 8),
          campaignId: campaign?.id,
          campaignName: campaign?.name,
          campaignEnd: campaign?.endAt,
          campaignSource: campaign?.source,
          advertiserId: campaign?.advertiser.id,
        };

        return detail;
      }),
  }));

  const ads: AdDetails[] = _.flatMap(adSets, "ads");

  return (
    <EnhancedTable
      rows={ads}
      filterable={false}
      initialSortColumn={0}
      initialSortDirection="desc"
      columns={[
        {
          title: "Created",
          value: (c) => c.creative.createdAt,
          renderer: StandardRenderers.date,
        },
        {
          title: "Ad Name",
          value: (c) => c.creative.name,
        },
        {
          title: "Ad Set Name",
          value: (c) => c.adSetName,
        },
        {
          title: "Title",
          value: (c) => c.creative.payloadNotification?.title,
        },
        {
          title: "Body",
          value: (c) => c.creative.payloadNotification?.body,
        },
        {
          title: "Spend",
          value: (c) => engagements.get(c.id)?.spend ?? "N/A",
          extendedRenderer: (r) =>
            renderStatsCell(
              loading,
              "spend",
              engagements.get(r.id),
              campaign?.currency
            ),
          align: "right",
        },
        {
          title: "Impressions",
          value: (c) => engagements.get(c.id)?.views ?? "N/A",
          extendedRenderer: (r) =>
            renderStatsCell(loading, "views", engagements.get(r.id)),
          align: "right",
        },
        {
          title: "Clicks",
          value: (c) => engagements.get(c.id)?.clicks,
          extendedRenderer: (r) =>
            renderStatsCell(loading, "clicks", engagements.get(r.id)),
          align: "right",
        },
        {
          title: "10s Visits",
          value: (c) => engagements.get(c.id)?.landings,
          extendedRenderer: (r) =>
            renderStatsCell(loading, "landings", engagements.get(r.id)),
          align: "right",
        },
      ]}
    />
  );
}
