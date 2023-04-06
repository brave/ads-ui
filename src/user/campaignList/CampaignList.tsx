import React from "react";
import {
  EnhancedTable,
  StandardRenderers,
} from "../../components/EnhancedTable";
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
} from "../../components/EnhancedTable/renderers";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { Status } from "../../components/Campaigns/Status";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { isAfterEndDate } from "../../util/isAfterEndDate";
import { IAdvertiser } from "../../actions";
import { CampaignFormat } from "../../graphql/types";

interface Props {
  campaigns: CampaignFragment[];
  advertiser: IAdvertiser;
  loading: boolean;
  fromDate: Date | null;
}

export function CampaignList({
  campaigns,
  advertiser,
  loading,
  fromDate,
}: Props) {
  const history = useHistory();

  if (loading) return <LinearProgress />;

  const canEdit = advertiser.selfServiceEdit;

  return (
    <EnhancedTable
      rows={campaigns}
      initialSortColumn={6}
      initialSortDirection="desc"
      columns={[
        {
          title: "On/Off",
          value: (c) => c.state,
          extendedRenderer: (r) =>
            campaignOnOffState({ ...r, fromDate }, advertiser),
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
              <Link
                href={
                  r.state !== "under_review"
                    ? `/user/main/campaign/${r.id}/analytics/overview`
                    : undefined
                }
                underline="none"
              >
                {r.name}
              </Link>
              {canEdit &&
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
      ]}
    />
  );
}
