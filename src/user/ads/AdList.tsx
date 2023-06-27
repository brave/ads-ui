import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";
import { AdFragment } from "graphql/ad-set.generated";
import { CampaignSource } from "graphql/types";

interface Props {
  advertiserCampaigns?: AdvertiserCampaignsFragment | null;
  fromDate: Date | null;
}

export type AdDetails = AdFragment & {
  adSetName: string;
  campaignName: string;
  campaignEnd: string;
  campaignSource: CampaignSource;
  advertiserId: string;
  fromDate: Date | null;
};

export function AdList({ advertiserCampaigns, fromDate }: Props) {
  const campaigns = advertiserCampaigns?.campaigns ?? [];
  const adSets = _.flatMap(
    campaigns.map((c) => ({
      adSets: c.adSets.map((a) => ({
        ads: (a.ads ?? [])
          .filter((ad) => ad.state !== "deleted")
          .map((ad) => ({
            ...ad,
            state: isAfterEndDate(c.endAt) ? "completed" : c.state,
            adSetName: a.name || a.id.substring(0, 8),
            campaignName: c.name,
            campaignEnd: c.endAt,
            campaignSource: c.source,
            advertiserId: advertiserCampaigns?.id,
            fromDate,
          })),
      })),
    })),
    "adSets"
  );

  const ads: AdDetails[] = _.flatMap(adSets, "ads").filter(
    (ad) => ad.creative.type.code === "notification_all_v1"
  );

  return (
    <EnhancedTable
      rows={ads}
      initialSortColumn={6}
      initialSortDirection="desc"
      columns={[
        {
          title: "Ad Name",
          value: (c) => c.creative.name,
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
          title: "Ad Set Name",
          value: (c) => c.adSetName,
        },
        {
          title: "Campaign Name",
          value: (c) => c.campaignName,
        },
        {
          title: "Campaign End",
          value: (c) => c.campaignEnd,
          renderer: StandardRenderers.date,
        },
        {
          title: "Created",
          value: (c) => c.creative.createdAt,
          renderer: StandardRenderers.date,
        },
      ]}
    />
  );
}
