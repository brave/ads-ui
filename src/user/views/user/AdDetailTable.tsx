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
        valueGetter: ({ row }) => engagements.get(row.id)?.spend?.toNumber(),
        renderCell: ({ row }) =>
          renderStatsCell(
            loading,
            "spend",
            engagements.get(row.id),
            campaign?.currency,
          ),
        align: "right",
        headerAlign: "right",
        width: 100,
      },
      {
        field: "view",
        type: "number",
        headerName: "Impressions",
        valueGetter: ({ row }) => engagements.get(row.id)?.views?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "views", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 155,
      },
      {
        field: "click",
        type: "number",
        headerName: "Clicks",
        valueGetter: ({ row }) => engagements.get(row.id)?.clicks?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "clicks", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 125,
      },
      {
        field: "landed",
        type: "number",
        headerName: "Site Visits",
        valueGetter: ({ row }) => engagements.get(row.id)?.landings?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "landings", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 125,
      },
      {
        field: "ctr",
        type: "number",
        headerName: "CTR",
        valueGetter: ({ row }) => engagements.get(row.id)?.ctr?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "ctr", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 100,
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
      getRowId={(row) => row.id}
      sx={{ borderStyle: "none" }}
      initialState={{
        sorting: {
          sortModel: [{ field: "name", sort: "desc" }],
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
