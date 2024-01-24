import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdFragment } from "graphql/ad-set.generated";
import { CampaignSource } from "graphql/types";
import { CampaignAdsFragment } from "graphql/campaign.generated";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import { AdDetailTable } from "user/views/user/AdDetailTable";
import { GridColDef } from "@mui/x-data-grid";
import { CreativeFragment } from "graphql/creative.generated";
import { Box } from "@mui/material";

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
  const adSets = campaign?.adSets?.map((c) => ({
    ads: (c.ads ?? []).map((ad) => {
      const detail: AdDetails = {
        ...ad,
        adState: ad.state,
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

  const columns: GridColDef<AdDetails>[] = [
    {
      field: "name",
      headerName: "Ad Name",
      valueGetter: ({ row }) =>
        row.adState !== "deleted"
          ? row.creative.name
          : `(DELETED) ${row.creative.name}`,
      renderCell: ({ row }) => (
        <Box>
          {row.adState === "deleted" && <strong>(DELETED) </strong>}
          {row.creative.name}
        </Box>
      ),
      flex: 1,
    },
    {
      field: "adSetName",
      headerName: "Ad Set Name",
      valueGetter: ({ row }) => row.adSetName,
      flex: 1,
    },
    {
      field: "title",
      headerName: "Title",
      valueGetter: ({ row }) => title(row.creative),
      flex: 1,
    },
    {
      field: "body",
      headerName: "Body",
      valueGetter: ({ row }) => body(row.creative),
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
