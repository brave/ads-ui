import _ from "lodash";
import { isDateInThePast } from "@/util/isAfterEndDate";
import {
  AdFragment,
  CampaignAdsFragment,
  CampaignSource,
  CreativeFragment,
} from "@/graphql-client/graphql";
import { StatsMetric } from "@/user/analytics/analyticsOverview/types";
import { AdDetailTable } from "@/user/views/user/AdDetailTable";
import { GridColDef } from "@mui/x-data-grid";
import { Box } from "@mui/material";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";

interface Props {
  campaign?: CampaignAdsFragment | null;
  loading: boolean;
  engagements: Map<string, StatsMetric>;
}

export type AdDetails = AdFragment & {
  adSetName: string;
  adState: string;
  campaignName: string;
  campaignEnd: string;
  campaignSource: CampaignSource;
  advertiserId: string;
  campaignId: string;
};

export function AdList({ campaign, loading, engagements }: Props) {
  const { _: lingui } = useLingui();
  const adSets = campaign?.adSets?.map((c) => ({
    ads: (c.ads ?? []).map((ad) => {
      const detail: AdDetails = {
        ...ad,
        adState: ad.state,
        state: isDateInThePast(campaign?.endAt) ? "completed" : c.state,
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

  const columns: GridColDef<AdDetails>[] = [
    {
      field: "name",
      headerName: lingui(msg`Ad Name`),
      valueGetter: (_value, row) =>
        row.adState !== "deleted"
          ? row.creative.name
          : `(DELETED) ${row.creative.name}`,
      renderCell: ({ row }) => (
        <Box>
          {row.adState === "deleted" && (
            <strong>
              (<Trans>DELETED</Trans>)
            </strong>
          )}
          {row.creative.name}
        </Box>
      ),
      flex: 1,
    },
    {
      field: "adSetName",
      headerName: lingui(msg`Ad set name`),
      valueGetter: (_value, row) => row.adSetName,
      flex: 1,
    },
    {
      field: "title",
      headerName: lingui(msg`Title`),
      valueGetter: (_value, row) => title(row.creative),
      flex: 1,
    },
    {
      field: "body",
      headerName: lingui(msg`Body`),
      valueGetter: (_value, row) => body(row.creative),
      flex: 1,
    },
  ];

  return (
    <AdDetailTable
      rows={ads}
      columns={columns}
      engagements={engagements}
      loading={loading}
    />
  );
}

const title = (c: CreativeFragment) =>
  c.payloadNotification?.title ??
  c.payloadInlineContent?.title ??
  c.payloadSearch?.title ??
  c.payloadSearchHomepage?.title;

const body = (c: CreativeFragment) =>
  c.payloadNotification?.body ??
  c.payloadInlineContent?.ctaText ??
  c.payloadSearch?.body ??
  c.payloadSearchHomepage?.body;
