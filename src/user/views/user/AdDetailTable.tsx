import { CampaignAdsFragment, CampaignFormat } from "@/graphql-client/graphql";
import { StatsMetric } from "@/user/analytics/analyticsOverview/types";
import { renderStatsCell } from "@/user/analytics/renderers";
import { DataGrid, GridColDef, GridValidRowModel } from "@mui/x-data-grid";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

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
  const { _ } = useLingui();

  if (campaign?.format !== CampaignFormat.NtpSi) {
    displayColumns.push(
      {
        field: "spend",
        headerName: _(msg`Spend`),
        valueGetter: (_value, row) =>
          engagements.get(row.id)?.spend?.toNumber(),
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
        headerName: _(msg`Impressions`),
        valueGetter: (_value, row) =>
          engagements.get(row.id)?.views?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "views", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 155,
      },
      {
        field: "click",
        type: "number",
        headerName: _(msg`Clicks`),
        valueGetter: (_value, row) =>
          engagements.get(row.id)?.clicks?.toString(),
        renderCell: ({ row }) =>
          renderStatsCell(loading, "clicks", engagements.get(row.id)),
        align: "right",
        headerAlign: "right",
        width: 125,
      },
      {
        field: "landed",
        type: "number",
        headerName: _(msg`Site Visits`),
        valueGetter: (_value, row) =>
          engagements.get(row.id)?.landings?.toString(),
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
        valueGetter: (_value, row) => engagements.get(row.id)?.ctr?.toString(),
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
      pageSizeOptions={[10, 25, 50]}
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
