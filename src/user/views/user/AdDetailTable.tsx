import { ColumnDescriptor, EnhancedTable } from "components/EnhancedTable";
import { CampaignAdsFragment } from "graphql/campaign.generated";
import { CampaignFormat } from "graphql/types";
import { StatsMetric } from "user/analytics/analyticsOverview/types";
import { renderStatsCell } from "user/analytics/renderers";

interface Props<T> {
  rows: T[];
  columns: ColumnDescriptor<T>[];
  engagements: Map<string, StatsMetric>;
  loading: boolean;
  campaign?: Omit<CampaignAdsFragment, "adSets"> | null;
  propOverride?: {
    initialSortColumn?: number;
  };
}

export function AdDetailTable<T extends { id: string }>({
  rows,
  columns,
  campaign,
  engagements,
  loading,
  propOverride,
}: Props<T>) {
  const displayColumns = [...columns];

  if (campaign?.format !== CampaignFormat.NtpSi) {
    displayColumns.push(
      {
        title: "Spend",
        value: (c) => engagements.get(c.id)?.spend ?? "N/A",
        extendedRenderer: (r) =>
          renderStatsCell(
            loading,
            "spend",
            engagements.get(r.id),
            campaign?.currency,
          ),
        align: "right",
      },
      {
        title: "Impressions",
        value: (c) => engagements.get(c.id)?.views ?? "N/A",
        extendedRenderer: (r) =>
          renderStatsCell(loading, "views", engagements.get(r.id)),
        align: "right",
      },
      {
        title: "Clicks",
        value: (c) => engagements.get(c.id)?.clicks,
        extendedRenderer: (r) =>
          renderStatsCell(loading, "clicks", engagements.get(r.id)),
        align: "right",
      },
      {
        title: "10s Visits",
        value: (c) => engagements.get(c.id)?.landings,
        extendedRenderer: (r) =>
          renderStatsCell(loading, "landings", engagements.get(r.id)),
        align: "right",
      },
      {
        title: "CTR",
        value: (c) => engagements.get(c.id)?.ctr,
        extendedRenderer: (r) =>
          renderStatsCell(loading, "ctr", engagements.get(r.id)),
        align: "right",
      },
    );
  }

  return (
    <EnhancedTable
      rows={rows}
      filterable={false}
      initialSortColumn={propOverride?.initialSortColumn ?? 1}
      initialSortDirection="desc"
      initialRowsPerPage={5}
      columns={displayColumns}
    />
  );
}
