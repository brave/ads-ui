import { useState } from "react";
import { Link } from "@mui/material";
import {
  campaignOnOffState,
  renderMonetaryAmount,
  StandardRenderers,
} from "components/Datagrid/renderers";
import { Link as RouterLink } from "react-router-dom";
import { Status } from "components/Campaigns/Status";
import { isAfterEndDate } from "util/isAfterEndDate";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";
import { useEngagementOverviewQuery } from "graphql/analytics-overview.generated";
import {
  EngagementOverview,
  engagementValue,
  renderEngagementCell,
  renderStatsCell,
} from "user/analytics/renderers";
import _ from "lodash";
import { uiTextForCampaignFormat } from "user/library";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomToolbar } from "components/Datagrid/CustomToolbar";
import { CloneCampaign } from "components/Campaigns/CloneCampaign";
import { EditButton } from "user/campaignList/EditButton";
import { calculateMetric } from "user/analytics/analyticsOverview/lib/overview.library";
import { StatsMetric } from "user/analytics/analyticsOverview/types";

interface Props {
  advertiser?: AdvertiserCampaignsFragment | null;
}

export function CampaignList({ advertiser }: Props) {
  const [selectedCampaign, setSelectedCampaign] = useState<string | number>();
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

  const getStatFromEngagement = (
    row: CampaignSummaryFragment,
    k1: keyof EngagementOverview,
    k2: keyof EngagementOverview,
    m?: Map<string, EngagementOverview>,
  ) => {
    const val1 = m?.get(row.id)?.[k1];
    const val2 = m?.get(row.id)?.[k2];

    if (typeof val1 !== "number" || typeof val2 !== "number") {
      return null;
    }

    return calculateMetric(true, val1 ?? 0, val2 ?? 0);
  };

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
      flex: 1,
    },
    {
      field: "format",
      headerName: "Format",
      valueGetter: ({ row }) => uiTextForCampaignFormat(row.format),
      align: "left",
      headerAlign: "left",
      width: 150,
    },
    {
      field: "state",
      headerName: "Status",
      valueGetter: ({ row }) =>
        isAfterEndDate(row.endAt) ? "completed" : row.state,
      renderCell: ({ row }) => (
        <Status state={row.state} start={row.startAt} end={row.endAt} />
      ),
      minWidth: 120,
      maxWidth: 150,
    },
    {
      field: "budget",
      headerName: "Budget",
      renderCell: ({ row }) => renderMonetaryAmount(row.budget, row.currency),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "spend",
      headerName: "Spend",
      valueGetter: ({ row }) => row.spent,
      renderCell: ({ row }) =>
        renderEngagementCell(loading, row, "spend", engagementData),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "view",
      headerName: "Impressions",
      valueGetter: ({ row }) => engagementData?.get(row.id)?.["view"] ?? "N/A",
      renderCell: ({ row }) =>
        renderEngagementCell(loading, row, "view", engagementData),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "click",
      headerName: "Clicks",
      valueGetter: ({ row }) => engagementData?.get(row.id)?.["click"] ?? "N/A",
      renderCell: ({ row }) =>
        renderEngagementCell(loading, row, "click", engagementData),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "landed",
      headerName: "Site visits",
      valueGetter: ({ row }) =>
        engagementData?.get(row.id)?.["landed"] ?? "N/A",
      renderCell: ({ row }) =>
        renderEngagementCell(loading, row, "landed", engagementData),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "ctr",
      headerName: "CTR",
      valueGetter: ({ row }) =>
        getStatFromEngagement(row, "click", "view", engagementData),
      renderCell: ({ row }) =>
        renderStatsCell(
          loading,
          "ctr",
          {
            ctr:
              getStatFromEngagement(row, "click", "view", engagementData) ?? 0,
          } as StatsMetric,
          row.currency,
        ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "startAt",
      headerName: "Start",
      valueGetter: ({ row }) => row.startAt,
      renderCell: ({ row }) => StandardRenderers.date(row.startAt),
      align: "right",
      headerAlign: "right",
      width: 120,
    },
    {
      field: "endAt",
      headerName: "End",
      valueGetter: ({ row }) => row.endAt,
      renderCell: ({ row }) => StandardRenderers.date(row.endAt),
      align: "right",
      headerAlign: "right",
      width: 120,
    },
  ];

  if (advertiser?.selfServiceManageCampaign) {
    columns.unshift({
      field: "switch",
      headerName: "On/Off",
      type: "actions",
      valueGetter: ({ row }) => row.state,
      renderCell: ({ row }) =>
        campaignOnOffState({
          ...row,
          advertiserId: advertiser?.id ?? "",
        }),
      width: 100,
      sortable: false,
      filterable: false,
    });
  }

  const campaigns = advertiser?.campaigns ?? [];
  const Toolbar = () => {
    const campaign = campaigns.find((c) => c.id === selectedCampaign);
    const isDisabled = selectedCampaign === undefined;
    return (
      <CustomToolbar>
        {advertiser?.selfServiceManageCampaign && (
          <CloneCampaign disabled={isDisabled} campaign={campaign} />
        )}
        {advertiser?.selfServiceManageCampaign && (
          <EditButton disabled={isDisabled} campaign={campaign} />
        )}
      </CustomToolbar>
    );
  };

  return (
    <DataGrid
      loading={loading}
      rows={campaigns}
      columns={columns}
      density="compact"
      autoHeight
      disableRowSelectionOnClick
      checkboxSelection={advertiser?.selfServiceManageCampaign}
      slots={{ toolbar: Toolbar }}
      sx={{ borderStyle: "none" }}
      onRowSelectionModelChange={(rowSelectionModel) => {
        if (rowSelectionModel.length === 1) {
          setSelectedCampaign(rowSelectionModel[0]);
        } else {
          setSelectedCampaign(undefined);
        }
      }}
      isRowSelectable={(params) =>
        selectedCampaign === undefined || params.id === selectedCampaign
      }
      initialState={{
        sorting: {
          sortModel: [{ field: "startAt", sort: "desc" }],
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
    />
  );
}
