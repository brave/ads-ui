import React from "react";
import { EnhancedTable, StandardRenderers } from "components/EnhancedTable";
import {
  IconButton,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  campaignOnOffState,
  renderMonetaryAmount,
} from "components/EnhancedTable/renderers";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory, Link as RouterLink } from "react-router-dom";
import { Status } from "components/Campaigns/Status";
import { isAfterEndDate } from "util/isAfterEndDate";
import { CampaignFormat, CampaignSource } from "graphql/types";
import { AdvertiserCampaignsFragment } from "graphql/advertiser.generated";

interface Props {
  advertiserCampaigns?: AdvertiserCampaignsFragment | null;
  fromDate: Date | null;
}

export function CampaignList({ advertiserCampaigns, fromDate }: Props) {
  const history = useHistory();
  const campaigns = advertiserCampaigns?.campaigns ?? [];

  return (
    <EnhancedTable
      rows={campaigns}
      initialSortColumn={7}
      initialSortDirection="desc"
      columns={[
        {
          title: "On/Off",
          value: (c) => c.state,
          extendedRenderer: (r) =>
            campaignOnOffState({
              ...r,
              fromDate,
              advertiserId: advertiserCampaigns?.id ?? "",
            }),
          sx: { width: "10px" },
          sortable: false,
        },
        {
          title: "Campaign",
          value: (c) => c.name,
          extendedRenderer: (r) => (
            <Stack
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              direction="row"
            >
              {r.state === "active" ||
              r.state === "paused" ||
              r.state === "completed" ? (
                <Link
                  component={RouterLink}
                  to={`/user/main/campaign/${r.id}/analytics/overview`}
                  underline="none"
                >
                  {r.name}
                </Link>
              ) : (
                r.name
              )}
              {advertiserCampaigns?.selfServiceEdit &&
                r.source === CampaignSource.SelfServe &&
                r.format === CampaignFormat.PushNotification &&
                r.state !== "completed" && (
                  <Tooltip title={`Edit ${r.name}`}>
                    <IconButton
                      onClick={() =>
                        history.push(`/user/main/adsmanager/advanced/${r.id}`)
                      }
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                )}
            </Stack>
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
        },
        {
          title: "Spend",
          value: (c) => c.spent,
          extendedRenderer: (r) => renderMonetaryAmount(r.spent, r.currency),
        },
        {
          title: "Start",
          value: (c) => c.startAt,
          renderer: StandardRenderers.date,
        },
        {
          title: "End",
          value: (c) => c.endAt,
          renderer: StandardRenderers.date,
        },
        {
          title: "Created",
          value: (c) => c.createdAt,
          renderer: StandardRenderers.date,
        },
      ]}
    />
  );
}
