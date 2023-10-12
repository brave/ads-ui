import { useState } from "react";
import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import { Checkbox, Link } from "@mui/material";
import {
  campaignOnOffState,
  renderMonetaryAmount,
} from "components/EnhancedTable/renderers";
import { Link as RouterLink } from "react-router-dom";
import { Status } from "components/Campaigns/Status";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";
import { useEngagementOverviewQuery } from "graphql/analytics-overview.generated";
import {
  EngagementOverview,
  engagementValue,
  renderEngagementCell,
} from "user/analytics/renderers";
import _ from "lodash";
import { uiTextForCampaignFormat } from "user/library";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { GridColDef } from "@mui/x-data-grid";

interface Props {
  advertiser?: AdvertiserCampaignsFragment | null;
  selectedCampaigns: string[];
  onCampaignSelect: (c: string, insert: boolean) => void;
}

export function CampaignList({
  advertiser,
  selectedCampaigns,
  onCampaignSelect,
}: Props) {
  let initialSort = 9;
  const [engagementData, setEngagementData] =
    useState<Map<string, EngagementOverview>>();

  const { loading } = useEngagementOverviewQuery({
    variables: { advertiserId: advertiser?.id ?? "" },
    pollInterval: 300_000,
    onCompleted(data) {
      const groupedId = _.groupBy(data.engagementsOverview, "campaignId");
      const m = new Map<string, EngagementOverview>();
      for (const key in groupedId) {
        m.set(key, engagementValue(groupedId[key]));
      }

      setEngagementData(m);
    },
  });

  const columns: GridColDef<CampaignSummaryFragment>[] = [
    {
      field: "name",
      headerName: "Campaign",
      renderCell: ({ row }) => (
        <Link
          component={RouterLink}
          to={`/user/main/campaign/${row.id}`}
          underline="none"
        >
          {row.name}
        </Link>
      ),
    },
    {
      field: "format",
      headerName: "Format",
      valueGetter: ({ row }) => uiTextForCampaignFormat(row.format),
    },
    {
      field: "state",
      headerName: "Status",
      valueGetter: ({ row }) =>
        isAfterEndDate(row.endAt) ? "completed" : row.state,
      renderCell: ({ row }) => (
        <Status state={row.state} start={row.startAt} end={row.endAt} />
      ),
      width: 1,
    },
    {
      field: "budget",
      headerName: "Budget",
      renderCell: ({ row }) => renderMonetaryAmount(row.budget, row.currency),
      align: "right",
    },
    {
      title: "Spend",
      value: (c) => c.spent,
      extendedRenderer: (r) =>
        renderEngagementCell(loading, r, "spend", engagementData),
      align: "right",
    },
    {
      title: "Impressions",
      value: (c) => engagementData?.get(c.id)?.["view"] ?? "N/A",
      extendedRenderer: (r) =>
        renderEngagementCell(loading, r, "view", engagementData),
      align: "right",
    },
    {
      title: "Clicks",
      value: (c) => engagementData?.get(c.id)?.["click"] ?? "N/A",
      extendedRenderer: (r) =>
        renderEngagementCell(loading, r, "click", engagementData),
      align: "right",
    },
    {
      title: "10s Visits",
      value: (c) => engagementData?.get(c.id)?.["landed"] ?? "N/A",
      extendedRenderer: (r) =>
        renderEngagementCell(loading, r, "landed", engagementData),
      align: "right",
    },
    {
      title: "Start",
      value: (c) => c.startAt,
      renderer: StandardRenderers.date,
      align: "right",
    },
    {
      title: "End",
      value: (c) => c.endAt,
      renderer: StandardRenderers.date,
      align: "right",
    },
  ];

  if (advertiser?.selfServiceManageCampaign) {
    initialSort += 2;
    columns.unshift(
      {
        title: "",
        value: (c) => c.id,
        extendedRenderer: (r) => (
          <CampaignCheckBox
            campaign={r}
            selectedCampaigns={selectedCampaigns}
            onCampaignSelect={onCampaignSelect}
          />
        ),
        align: "center",
        sx: { width: "1px" },
        sortable: false,
        filterable: false,
      },
      {
        title: "On/Off",
        value: (c) => c.state,
        extendedRenderer: (r) =>
          campaignOnOffState({
            ...r,
            advertiserId: advertiser?.id ?? "",
          }),
        sx: { width: "1px", p: 0 },
        sortable: false,
      },
    );
  }

  return (
    <EnhancedTable
      rows={advertiser?.campaigns ?? []}
      initialSortColumn={initialSort}
      initialSortDirection="desc"
      columns={columns}
    />
  );
}

interface CheckBoxProps {
  campaign: CampaignSummaryFragment;
  selectedCampaigns: string[];
  onCampaignSelect: (c: string, insert: boolean) => void;
}
const CampaignCheckBox = (props: CheckBoxProps) => {
  const campaignSelected = props.selectedCampaigns.some(
    (c) => c === props.campaign.id,
  );

  return (
    <Checkbox
      disabled={props.selectedCampaigns.length === 1 && !campaignSelected}
      size="small"
      sx={{ p: 0 }}
      checked={campaignSelected}
      onChange={(e) =>
        props.onCampaignSelect(props.campaign.id, e.target.checked)
      }
    />
  );
};
