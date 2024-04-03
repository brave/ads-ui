import { useMemo, useState } from "react";
import { Link } from "@mui/material";
import {
  campaignOnOffState,
  renderMonetaryAmount,
  StandardRenderers,
} from "components/Datagrid/renderers";
import { Link as RouterLink } from "react-router-dom";
import { Status } from "components/Campaigns/Status";
import { isDateInThePast } from "util/isAfterEndDate";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";
import {
  CampaignMetricSummaryValuesFragment,
  useCampaignMetricsQuery,
} from "graphql/analytics-overview.generated";
import { CampaignSummaryFragment } from "graphql/campaign.generated";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { CustomToolbar } from "components/Datagrid/CustomToolbar";
import { CloneCampaign } from "components/Campaigns/CloneCampaign";
import { EditButton } from "user/campaignList/EditButton";
import { uiLabelsForCampaignFormat } from "util/campaign";
import { stringFilterOperators } from "components/Datagrid/stringFilterOperators";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import { MetricValue } from "./MetricValue";
import { CampaignFormat } from "graphql/types";

interface Props {
  advertiser?: AdvertiserCampaignsFragment | null;
}

export function CampaignList({ advertiser }: Props) {
  const { _: lingui } = useLingui();
  const [selectedCampaign, setSelectedCampaign] = useState<string | number>();

  const { data, loading } = useCampaignMetricsQuery({
    variables: {
      campaignIds: (advertiser?.campaigns ?? [])
        .filter((c) => c.format !== CampaignFormat.NtpSi)
        .map((c) => c.id),
    },
    pollInterval: 300_000,
  });

  const metricValuesByCampaign = useMemo(() => {
    const values = data?.performance?.values ?? [];
    return new Map<string, CampaignMetricSummaryValuesFragment>(
      values.map((m) => [m.dimensions.campaign?.id ?? "", m.metrics]),
    );
  }, [data]);

  function findMetricValuesForCampaign(
    campaignId: string,
  ): CampaignMetricSummaryValuesFragment | undefined {
    return metricValuesByCampaign.get(campaignId);
  }

  const columns: GridColDef<CampaignSummaryFragment>[] = [
    {
      field: "name",
      headerName: lingui(msg`Campaign`),
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
      headerName: lingui(msg`Ad Format`),
      valueGetter: (_value, row) => uiLabelsForCampaignFormat(row.format),
      align: "left",
      headerAlign: "left",
      width: 150,
      filterOperators: stringFilterOperators(),
    },
    {
      field: "state",
      headerName: lingui(msg`Status`),
      valueGetter: (_value, row) =>
        isDateInThePast(row.endAt) ? "completed" : row.state,
      renderCell: ({ row }) => (
        <Status state={row.state} start={row.startAt} end={row.endAt} />
      ),
      minWidth: 120,
      maxWidth: 150,
    },
    {
      field: "budget",
      headerName: lingui(msg`Budget`),
      renderCell: ({ row }) => renderMonetaryAmount(row.budget, row.currency),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "spend",
      headerName: lingui(msg`Spend`),
      valueGetter: (_value, row) =>
        findMetricValuesForCampaign(row.id)?.spendUsd,
      renderCell: ({ value }) => (
        <MetricValue loading={loading} metricType="usd" value={value} />
      ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 150,
    },
    {
      field: "view",
      headerName: lingui(msg`Impressions`),
      type: "number",
      valueGetter: (_value, row) =>
        findMetricValuesForCampaign(row.id)?.impression,
      renderCell: ({ value }) => (
        <MetricValue metricType="number" loading={loading} value={value} />
      ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "click",
      headerName: lingui(msg`Clicks`),
      type: "number",
      valueGetter: (_value, row) => findMetricValuesForCampaign(row.id)?.click,
      renderCell: ({ value }) => (
        <MetricValue metricType="number" loading={loading} value={value} />
      ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "landed",
      headerName: lingui(msg`Site visits`),
      type: "number",
      valueGetter: (_value, row) =>
        row.format === CampaignFormat.Search
          ? undefined
          : findMetricValuesForCampaign(row.id)?.siteVisit,
      renderCell: ({ value }) => (
        <MetricValue metricType="number" loading={loading} value={value} />
      ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "ctr",
      headerName: "CTR",
      type: "number",
      valueGetter: (_value, row) =>
        findMetricValuesForCampaign(row.id)?.rates.clickThrough,
      renderCell: ({ value }) => (
        <MetricValue metricType="rate" loading={loading} value={value} />
      ),
      align: "right",
      headerAlign: "right",
      minWidth: 100,
      maxWidth: 250,
    },
    {
      field: "startAt",
      headerName: lingui(msg`Start`),
      valueGetter: (_value, row) => row.startAt,
      renderCell: ({ row }) => StandardRenderers.date(row.startAt),
      align: "right",
      headerAlign: "right",
      width: 120,
    },
    {
      field: "endAt",
      headerName: lingui(msg`End`),
      valueGetter: (_value, row) => row.endAt,
      renderCell: ({ row }) => StandardRenderers.date(row.endAt),
      align: "right",
      headerAlign: "right",
      width: 120,
    },
  ];

  if (advertiser?.selfServiceManageCampaign) {
    columns.unshift({
      field: "switch",
      headerName: lingui(msg`On/Off`),
      type: "actions",
      valueGetter: (_value, row) => row.state,
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
      pageSizeOptions={[10, 25, 50]}
      initialState={{
        sorting: {
          sortModel: [{ field: "startAt", sort: "desc" }],
        },
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
        filter: {
          filterModel: {
            items: [
              {
                field: "format",
                operator: "not",
                value: lingui(msg`New tab takeover`),
              },
            ],
          },
        },
      }}
    />
  );
}
