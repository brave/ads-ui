import React from "react";
import { EnhancedTable } from "../../components/EnhancedTable";
import { Chip, LinearProgress } from "@mui/material";
import { Status } from "../../components/Campaigns/Status";
import { CampaignFragment } from "../../graphql/campaign.generated";
import _ from "lodash";
import { uiTextForCreativeTypeCode } from "../library";

interface Props {
  campaigns: CampaignFragment[];
  loading: boolean;
}

export function AdList({ campaigns, loading }: Props) {
  console.log(campaigns);
  const mapAdName = campaigns.map((c) => ({
    adSets: c.adSets.map((a) => ({
      ads: (a.ads ?? []).map((ad) => ({
        ...ad,
        creative: {
          ...ad.creative,
          adSetName: a.name || a.id.substring(0, 8),
          campaignName: c.name,
          campaignStart: c.startAt,
          campaignEnd: c.endAt,
        },
      })),
    })),
  }));
  const ads = _.map(
    _.flatMap(_.flatMap(mapAdName, "adSets"), "ads"),
    "creative"
  ).filter((a) => a.state !== "deleted");

  if (loading) return <LinearProgress />;

  return (
    <EnhancedTable
      rows={ads}
      columns={[
        {
          title: "Ad Name",
          value: (c) => c.name,
        },
        {
          title: "State",
          value: (c) => c.state,
          extendedRenderer: (r) => <Status state={r.state} />,
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
      ]}
    />
  );
}
