import { useQuery } from "@apollo/client";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMetricSelection } from "./hooks";
import { MetricDefinition, getMetricListForCampaign } from "./metrics";
import _ from "lodash";
import { RenderMetricValue } from "./RenderMetricValue";
import { isBreakdownWithQuery, LocalizedBreakdown } from "./breakdowns";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";

function getColumnDefinitionForMetric(metric: MetricDefinition): GridColDef {
  return {
    headerName: metric.shortCaption ?? metric.caption,
    field: metric.id,
    type: "number",
    align: "right",
    headerAlign: "right",
    display: "flex",
    width: 100,
    renderCell: ({ value }) => (
      <RenderMetricValue metric={metric} value={value} />
    ),
  };
}

interface Props extends CampaignOverviewProps {
  breakdown: LocalizedBreakdown;
  filters: PerformanceFilter;
}

export function TabularData({ campaignOverview, breakdown, filters }: Props) {
  if (!isBreakdownWithQuery(breakdown)) throw new Error("opps");

  const { isSelected } = useMetricSelection();
  const { data, loading } = useQuery(breakdown.query, {
    pollInterval: 10 * 60 * 1000,
    variables: {
      filter: filters,
    },
  });

  const allMetrics = getMetricListForCampaign(campaignOverview);
  const metricColumns = allMetrics.map(getColumnDefinitionForMetric);

  const rows = (data?.performance?.values ?? []).map((p: any) => {
    const metricValues = _.fromPairs(
      allMetrics.map((m) => [m.id, m.getValue(p.metrics)]),
    );
    return {
      id: breakdown.extractId(p.dimensions),
      name: breakdown.extractName(p.dimensions),
      ...metricValues,
    };
  });

  const visibleColumns = _.fromPairs([
    ["id", false],
    ...allMetrics.map((m) => [m.id, isSelected(m)]),
  ]);

  return (
    <>
      <DataGrid
        disableRowSelectionOnClick
        autoPageSize
        loading={loading}
        density="compact"
        getRowId={(row) => `${row.id}`}
        sx={{ borderStyle: "none" }}
        rows={rows}
        columnVisibilityModel={visibleColumns}
        columns={[
          {
            headerName: "Id",
            field: "id",
            width: 350,
          },
          {
            headerName: "Name",
            field: "name",
            flex: 1,
            renderCell: ({ row }) =>
              breakdown.renderCell(row, campaignOverview),
          },
          ...metricColumns,
        ]}
      />
    </>
  );
}
