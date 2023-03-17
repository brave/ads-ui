import React from "react";
import {
  EnhancedTable,
  StandardRenderers,
} from "../../components/EnhancedTable";
import { Chip, LinearProgress } from "@mui/material";
import { Status } from "../../components/Campaigns/Status";
import { CampaignFragment } from "../../graphql/campaign.generated";
import _ from "lodash";
import { isAfterEndDate } from "../../util/isAfterEndDate";
import {
  adOnOffState,
  adSetOnOffState,
} from "../../components/EnhancedTable/renderers";
import { IAdvertiser } from "../../actions";

interface Props {
  campaigns: CampaignFragment[];
  loading: boolean;
  advertiser: IAdvertiser;
}

interface ChipListProps {
  items?: Array<{ name: string }> | undefined | null;
}

const ChipList: React.FC<ChipListProps> = ({ items }) => {
  if (!items) return null;

  const MAX_ITEMS = 12;

  const sorted = _.sortBy(items, "name");
  const max10 = _.take(sorted, MAX_ITEMS);

  return (
    <>
      {max10.map((item) => (
        <Chip
          key={item.name}
          label={item.name}
          size="small"
          variant="outlined"
          sx={{ mr: 1, marginY: "4px" }}
        />
      ))}

      {sorted.length > MAX_ITEMS && (
        <span>+ {sorted.length - MAX_ITEMS} more</span>
      )}
    </>
  );
};

export function AdSetList({ campaigns, loading, advertiser }: Props) {
  const mapAdSetName = campaigns.map((c) => ({
    adSets: c.adSets.map((a) => ({
      ...a,
      campaignName: c.name,
      campaignStart: c.startAt,
      campaignEnd: c.endAt,
      campaignId: c.id,
      campaignState: c.state,
    })),
  }));
  const adSets = _.flatMap(mapAdSetName, "adSets");

  const getState = (c: {
    campaignState: string;
    campaignEnd: string;
    state: string;
  }) => {
    return c.campaignState === "under_review"
      ? "under_review"
      : isAfterEndDate(c.campaignEnd)
      ? "completed"
      : c.state;
  };

  if (loading) return <LinearProgress />;

  return (
    <EnhancedTable
      rows={adSets}
      initialSortColumn={7}
      initialSortDirection="desc"
      columns={[
        {
          title: "On/Off",
          value: (c) => c.state,
          extendedRenderer: (r) => adSetOnOffState(r, advertiser),
          sx: { width: "10px" },
          sortable: false,
        },
        {
          title: "Ad Set Name",
          value: (c) => c.name || c.id.substring(0, 8),
        },
        {
          title: "State",
          value: (c) => getState(c),
          extendedRenderer: (r) => (
            <Status state={getState(r)} end={r.campaignEnd} />
          ),
        },
        {
          title: "Campaign Name",
          value: (c) => c.campaignName,
        },
        {
          title: "Type",
          value: (c) =>
            c.billingType === "cpm" ? "Impressions (CPM)" : "Clicks (CPC)",
        },
        {
          title: "Platforms",
          value: (c) => c.oses?.map((o) => o.name).join(", "),
          extendedRenderer: (r) => <ChipList items={r.oses} />,
        },
        {
          title: "Audiences",
          value: (c) => c.segments?.map((o) => o.name).join(", "),
          extendedRenderer: (r) => <ChipList items={r.segments} />,
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
