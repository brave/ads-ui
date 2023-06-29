import React, { useState } from "react";
import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import { Link } from "@mui/material";
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

interface Props {
  advertiser?: AdvertiserCampaignsFragment | null;
  fromDate: Date | null;
}

export function CampaignList({ advertiser, fromDate }: Props) {
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

  return (
    <EnhancedTable
      rows={advertiser?.campaigns ?? []}
      initialSortColumn={10}
      initialSortDirection="desc"
      columns={[
        {
          title: "On/Off",
          value: (c) => c.state,
          extendedRenderer: (r) =>
            campaignOnOffState({
              ...r,
              fromDate,
              advertiserId: advertiser?.id ?? "",
            }),
          sx: { width: "10px" },
          sortable: false,
        },
        {
          title: "Campaign",
          value: (c) => c.name,
          extendedRenderer: (r) => (
            <Link
              component={RouterLink}
              to={`/user/main/campaign/${r.id}`}
              underline="none"
            >
              {r.name}
            </Link>
          ),
        },
        {
          title: "Status",
          value: (c) => (isAfterEndDate(c.endAt) ? "completed" : c.state),
          extendedRenderer: (r) => <Status state={r.state} end={r.endAt} />,
        },
        {
          title: "Budget",
          value: (c) => c.budget,
          extendedRenderer: (r) => renderMonetaryAmount(r.budget, r.currency),
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
        {
          title: "Created",
          value: (c) => c.createdAt,
          renderer: StandardRenderers.date,
          align: "right",
        },
      ]}
    />
  );
}
