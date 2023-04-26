import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import { LinearProgress } from "@mui/material";
import { Status } from "components/Campaigns/Status";
import _ from "lodash";
import { uiTextForCreativeTypeCode } from "../library";
import { adOnOffState } from "components/EnhancedTable/renderers";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";

interface Props {
  advertiserCampaigns?: AdvertiserCampaignsFragment | null;
  fromDate: Date | null;
}

export function AdList({ advertiserCampaigns, fromDate }: Props) {
  const campaigns = advertiserCampaigns?.campaigns ?? [];
  const mapAdName = campaigns.map((c) => ({
    adSets: c.adSets.map((a) => ({
      ads: (a.ads ?? []).map((ad) => ({
        ...ad,
        creative: {
          ...ad.creative,
          creativeInstanceId: ad.id,
          creativeSetId: a.id,
          adSetName: a.name || a.id.substring(0, 8),
          campaignName: c.name,
          campaignStart: c.startAt,
          campaignEnd: c.endAt,
          campaignSource: c.source,
          advertiserId: advertiserCampaigns?.id,
          fromDate,
        },
      })),
    })),
  }));
  const ads = _.uniqBy(
    _.map(_.flatMap(_.flatMap(mapAdName, "adSets"), "ads"), "creative"),
    "id"
  ).filter((a) => a.state !== "deleted");

  return (
    <EnhancedTable
      rows={ads}
      initialSortColumn={9}
      initialSortDirection="desc"
      columns={[
        {
          title: "On/Off",
          value: (c) => c.state,
          extendedRenderer: (r) => adOnOffState(r),
          sx: { width: "10px" },
          sortable: false,
        },
        {
          title: "Ad Name",
          value: (c) => c.name,
        },
        {
          title: "State",
          value: (c) => (isAfterEndDate(c.campaignEnd) ? "completed" : c.state),
          extendedRenderer: (r) => (
            <Status state={r.state} end={r.campaignEnd} />
          ),
        },
        {
          title: "Type",
          value: (c) => uiTextForCreativeTypeCode(c.type),
        },
        {
          title: "Title",
          value: (c) =>
            c.payloadInlineContent?.title ??
            c.payloadNotification?.title ??
            c.payloadPromotedContent?.title ??
            c.payloadSearch?.title ??
            c.payloadSearchHomepage?.title,
        },
        {
          title: "Body",
          value: (c) =>
            c.payloadInlineContent?.description ??
            c.payloadNotification?.body ??
            c.payloadPromotedContent?.description ??
            c.payloadSearch?.body ??
            c.payloadSearchHomepage?.body,
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
          value: (c) => c.createdAt,
          renderer: StandardRenderers.date,
        },
      ]}
    />
  );
}
