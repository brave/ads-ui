import { ColumnDescriptor, StandardRenderers } from "components/EnhancedTable";
import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdFragment } from "graphql/ad-set.generated";
import { CampaignSource } from "graphql/types";
import { CampaignAdsFragment } from "graphql/campaign.generated";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import React from "react";
import { AdDetailTable } from "user/views/user/AdDetailTable";

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

  const columns: ColumnDescriptor<AdDetails>[] = [
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
  ];

  return (
    <AdDetailTable
      rows={ads}
      columns={columns}
      engagements={engagements}
      loading={loading}
      propOverride={{
        initialSortColumn: 0,
      }}
    />
  );
}
