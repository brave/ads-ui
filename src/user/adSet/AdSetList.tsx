import { Chip } from "@mui/material";
import { Status } from "@/components/Campaigns/Status";
import _ from "lodash";
import { adSetOnOffState } from "@/components/Datagrid/renderers";
import { CampaignAdsFragment } from "@/graphql/campaign.generated";
import { CampaignSource } from "@/graphql/types";
import { StatsMetric } from "@/user/analytics/analyticsOverview/types";
import { AdSetWithDeletedAdsFragment } from "@/graphql/ad-set.generated";
import { AdDetailTable } from "@/user/views/user/AdDetailTable";
import { displayFromCampaignState } from "@/util/displayState";
import { uiLabelsForBillingType } from "@/util/billingType";
import { GridColDef } from "@mui/x-data-grid";
import { segmentNameWithNoDash } from "@/util/segment";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";

interface Props {
  loading: boolean;
  engagements: Map<string, StatsMetric>;
  campaign?: CampaignAdsFragment | null;
}

interface ChipListProps {
  items?: Array<{ name: string }> | undefined | null;
  max?: number;
}

const ChipList = ({ items, max }: ChipListProps) => {
  if (!items) return null;

  const MAX_ITEMS = max ?? 10;

  const sorted = _.sortBy(items, "name");
  const max10 = _.take(sorted, MAX_ITEMS);

  return (
    <>
      {max10.map((item) => (
        <Chip
          key={item.name}
          label={item.name}
          size="small"
          variant="outlined"
          sx={{ mr: 1, marginY: "4px" }}
        />
      ))}

      {sorted.length > MAX_ITEMS && (
        <span>
          + {sorted.length - MAX_ITEMS} <Trans>more</Trans>
        </span>
      )}
    </>
  );
};

export type AdSetDetails = AdSetWithDeletedAdsFragment & CampaignExtras;

export type CampaignExtras = {
  campaignStart: string;
  campaignEnd: string;
  campaignId: string;
  campaignState: string;
  campaignSource: CampaignSource;
  advertiserId: string;
};

export function AdSetList({ campaign, loading, engagements }: Props) {
  const { _ } = useLingui();
  const adSets: AdSetDetails[] = (campaign?.adSets ?? []).map((c) => ({
    ...c,
    campaignStart: campaign?.startAt ?? "",
    campaignEnd: campaign?.endAt ?? "",
    campaignId: campaign?.id ?? "",
    campaignState: campaign?.state ?? "draft",
    campaignSource: campaign?.source ?? CampaignSource.SelfServe,
    advertiserId: campaign?.advertiser.id ?? "",
  }));

  const columns: GridColDef<AdSetDetails>[] = [
    {
      field: "switch",
      type: "actions",
      headerName: _(msg`On/Off`),
      valueGetter: (_value, row) => row.state,
      renderCell: ({ row }) => adSetOnOffState(row),
      sortable: false,
      filterable: false,
      width: 100,
    },
    {
      field: "name",
      headerName: _(msg`Name`),
      valueGetter: (_value, row) => row.name || row.id.substring(0, 8),
      flex: 1,
    },
    {
      field: "state",
      headerName: _(msg`Status`),
      valueGetter: (_value, row) => displayFromCampaignState(row),
      renderCell: ({ row }) => (
        <Status
          state={displayFromCampaignState(row)}
          end={row.campaignEnd}
          start={row.campaignStart}
        />
      ),
      width: 100,
    },
    {
      field: "billingType",
      headerName: _(msg`Type`),
      valueGetter: (_value, row) =>
        uiLabelsForBillingType(row.billingType).longLabel,
      width: 150,
    },
    {
      field: "oses",
      headerName: _(msg`Platforms`),
      valueGetter: (_value, row) =>
        row.oses?.map((o: { name: string }) => o.name).join(", "),
      renderCell: ({ row }) => {
        if (row.oses?.length === 5) {
          return (
            <Chip
              label="all"
              size="small"
              variant="outlined"
              sx={{ mr: 1, marginY: "4px" }}
            />
          );
        }

        return <ChipList items={row.oses} />;
      },
      flex: 1,
    },
    {
      field: "segments",
      headerName: _(msg`Audiences`),
      valueGetter: (_value, row) =>
        row.segments?.map((o: { name: string }) => o.name).join(", "),
      renderCell: ({ row }) => (
        <ChipList
          items={row.segments.map((o) => ({
            name: segmentNameWithNoDash(o.name),
          }))}
          max={(row.segments ?? []).join("").length > 100 ? 2 : 5}
        />
      ),
      flex: 1,
    },
  ];

  return (
    <AdDetailTable
      rows={adSets}
      columns={columns}
      engagements={engagements}
      loading={loading}
    />
  );
}
