import { CampaignAdsFragment } from "graphql/campaign.generated";
import { CampaignFormat } from "graphql/types";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import { renderStatsCell } from "user/analytics/renderers";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";

interface Props<T extends GridValidRowModel> {
  rows: T[];
  columns: GridColDef<T>[];
  engagements: Map<string, StatsMetric>;
  loading: boolean;
  campaign?: Omit<CampaignAdsFragment, "adSets"> | null;
}

export function AdDetailTable<T extends { id: string }>({
  rows,
  columns,
  campaign,
  engagements,
  loading,
}: Props<T>) {
  const displayColumns = [...columns];

  if (campaign?.format !== CampaignFormat.NtpSi) {
    displayColumns.push(
      {
        field: "spend",
        headerName: "Spend",
        valueGetter: ({ row }) => engagements.get(row.id)?.spend ?? "N/A",
        renderCell: ({ row }) =>
          renderStatsCell(
            loading,
            "spend",
            engagements.get(row.id),
            campaign?.currency,
          ),
        align: "right",
        headerAlign: "right",
        width: 250,
      },
      {
        field: "view",
        headerName: "Impressions",
        valueGetter: ({ row }) => engagements.get(row.id)?.views ?? "N/A",
        renderCell: ({ row }) =>
          renderStatsCell(loading, "views", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 250,
      },
      {
        field: "click",
        headerName: "Clicks",
        valueGetter: ({ row }) => engagements.get(row.id)?.clicks,
        renderCell: ({ row }) =>
          renderStatsCell(loading, "clicks", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 250,
      },
      {
        field: "landed",
        headerName: "10s Visits",
        valueGetter: ({ row }) => engagements.get(row.id)?.landings,
        renderCell: ({ row }) =>
          renderStatsCell(loading, "landings", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 250,
      },
      {
        field: "ctr",
        headerName: "CTR",
        valueGetter: ({ row }) => engagements.get(row.id)?.ctr,
        renderCell: ({ row }) =>
          renderStatsCell(loading, "ctr", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 250,
      },
    );
  }

  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={displayColumns}
      density="compact"
      autoHeight
      disableRowSelectionOnClick
      hideFooterSelectedRowCount
      sx={{ borderStyle: "none" }}
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
