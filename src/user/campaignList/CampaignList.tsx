import React, { useContext, useEffect, useState } from "react";
import {
  ColumnDescriptor,
  EnhancedTable,
  StandardRenderers,
} from "../../components/EnhancedTable";
import {
  Box,
  IconButton,
  LinearProgress,
  Link,
  Stack,
  Tooltip,
} from "@mui/material";
import {
  campaignName,
  campaignOnOffState,
  renderMonetaryAmount,
} from "../../components/EnhancedTable/renderers";
import EditIcon from "@mui/icons-material/Edit";
import { useHistory } from "react-router-dom";
import { Status } from "../../components/Campaigns/Status";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { isAfterEndDate } from "../../util/isAfterEndDate";
import { IAdvertiser } from "../../actions";
import StatusTabs, { TabStatus } from "../../components/Tabs/StatusTabs";
import { DraftContext } from "../../state/context";
import * as buffer from "buffer";

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
  if (loading) return <LinearProgress />;
  const [state, setState] = useState<TabStatus>("all");
  const [data, setData] = useState(campaigns);
  const canEdit = advertiser.selfServiceEdit;

  useEffect(() => {
    let arr: CampaignFragment[];
    switch (state) {
      case "complete":
        arr = campaigns.filter((c) => c.state === "completed");
        break;
      case "in_progress":
        arr = campaigns.filter(
          (c) =>
            c.state === "active" ||
            c.state === "daycomplete" ||
            c.state === "paused"
        );
        break;
      case "under_review":
        arr = campaigns.filter(
          (c) => c.state === "under_review" || c.state === "suspended"
        );
        break;
      case "draft":
        arr = campaigns.filter((c) => c.state === "draft");
        break;
      default:
        arr = campaigns;
    }

    setData(arr ?? []);
  }, [state]);

  const columns: ColumnDescriptor<CampaignFragment>[] = [
    {
      title: "Campaign",
      value: (c) => c.name,
      extendedRenderer: (r) => campaignName(r, canEdit),
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
  ];

  if (state === "in_progress") {
    columns.unshift({
      title: "On/Off",
      value: (c) => c.state,
      extendedRenderer: (r) =>
        campaignOnOffState({ ...r, fromDate }, advertiser),
      sx: { width: "10px" },
      sortable: false,
    });
  }

  return (
    <Box>
      <StatusTabs
        onChange={setState}
        defaultStatus={state}
        hideTabs={advertiser.selfServiceCreate ? undefined : ["draft"]}
      />
      <EnhancedTable
        rows={data}
        initialSortColumn={columns.findIndex((c) => c.title === "Created")}
        initialSortDirection="desc"
        columns={columns}
      />
    </Box>
  );
}
