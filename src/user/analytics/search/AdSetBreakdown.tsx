import { msg } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Status } from "components/Campaigns/Status";
import {
  AdSetValuesFragment,
  useFetchAdSetMetricsForCampaignQuery,
} from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { uiLabelsForBillingType } from "util/billingType";
import { displayFromCampaignState } from "util/displayState";
import { MetricDefinition, getMetricListForCampaign } from "./metrics";
import { RenderMetric } from "./RenderMetric";
import { i18n } from "@lingui/core";
import lodash from "lodash";
import { PerformanceFilter } from "graphql/types";

function getColumnDefinitionForMetric(metric: MetricDefinition): GridColDef {
  return {
    headerName: i18n._(metric.shortCaption ?? metric.caption),
    field: metric.id,
    type: "number",
    align: "right",
    headerAlign: "right",
    width: 100,
    renderCell: ({ value }) => (
      <RenderMetric type={metric.type} value={value} />
    ),
  };
}

interface Props {
  campaignSummary: CampaignSummaryFragment;
  filter: PerformanceFilter;
}

export function AdSetBreakdown({ campaignSummary, filter }: Props) {
  const { _ } = useLingui();

  const { data, loading } = useFetchAdSetMetricsForCampaignQuery({
    variables: {
      filter,
    },
  });

  const allMetrics = getMetricListForCampaign(campaignSummary);
  const metricColumns = allMetrics.map(getColumnDefinitionForMetric);

  const rows = (data?.performance?.values ?? []).map((p) => {
    const metricValues = lodash.fromPairs(
      allMetrics.map((m) => [m.id, m.getValue(p.metrics)]),
    );
    return {
      ...p,
      ...metricValues,
    };
  });

  const baseColumns: GridColDef<AdSetValuesFragment>[] = [
    {
      field: "name",
      headerName: _(msg`Name`),
      valueGetter: (_value, row) =>
        row.dimensions.adSet?.name ||
        row.dimensions.adSet?.id?.substring(0, 8) ||
        "?",
      flex: 1,
    },
    {
      field: "state",
      headerName: _(msg`Status`),
      valueGetter: (_value, row) =>
        displayFromCampaignState({
          campaignState: campaignSummary.state,
          campaignStart: campaignSummary.startAt,
          campaignEnd: campaignSummary.endAt,
          state: row.dimensions.adSet?.state,
        }),
      renderCell: ({ value }) => (
        <Status
          state={value}
          end={campaignSummary.endAt}
          start={campaignSummary.startAt}
        />
      ),
      width: 100,
    },
    {
      field: "billingType",
      headerName: _(msg`Type`),
      valueGetter: (_value, row) =>
        uiLabelsForBillingType(row.dimensions.adSet?.billingType).longLabel,
      width: 150,
    },
  ];

  const columns = [...baseColumns, ...metricColumns];

  return (
    <DataGrid
      loading={loading}
      rows={rows}
      columns={columns}
      density="compact"
      autoHeight
      disableRowSelectionOnClick
      hideFooterSelectedRowCount
      getRowId={(row) => row.dimensions.adSet?.id ?? ""}
      sx={{ borderStyle: "none" }}
      pageSizeOptions={[10, 20, 50]}
      initialState={{
        sorting: {
          sortModel: [{ field: "spend", sort: "desc" }],
        },
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
    />
  );
}
