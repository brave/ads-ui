import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdFragment } from "graphql/ad-set.generated";
import { CampaignSource } from "graphql/types";
import { CampaignFragment } from "graphql/campaign.generated";

interface Props {
  campaign?: CampaignFragment | null;
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

export function AdList({ campaign, fromDate }: Props) {
  const adSets = campaign?.adSets?.map((c) => ({
    ads: (c.ads ?? [])
      .filter((ad) => ad.state !== "deleted")
      .map((ad) => ({
        ...ad,
        state: isAfterEndDate(campaign?.endAt) ? "completed" : c.state,
        adSetName: c.name || c.id.substring(0, 8),
        campaignSource: campaign?.source,
        advertiserId: fromDate,
      })),
  }));

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
          title: "Created",
          value: (c) => c.creative.createdAt,
          renderer: StandardRenderers.date,
        },
      ]}
    />
  );
}
