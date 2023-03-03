import React from "react";
import { EnhancedTable } from "../../components/EnhancedTable";
import { Chip, LinearProgress } from "@mui/material";
import { Status } from "../../components/Campaigns/Status";
import { CampaignFragment } from "../../graphql/campaign.generated";
import _ from "lodash";
import { AdSetFragment } from "../../graphql/ad-set.generated";

interface Props {
  campaigns: CampaignFragment[];
  loading: boolean;
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

export function AdSetList({ campaigns, loading }: Props) {
  const mapAdSetName = campaigns.map((c) => ({
    adSets: c.adSets.map((a) => ({ ...a, campaignName: c.name })),
  }));
  const adSets = _.flatMap(mapAdSetName, "adSets");

  if (loading) return <LinearProgress />;

  return (
    <EnhancedTable
      rows={adSets}
      columns={[
        {
          title: "Ad Set Name",
          value: (c) => c.name || c.id.substring(0, 8),
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
          title: "State",
          value: (c) => c.state,
          extendedRenderer: (r) => <Status state={r.state} />,
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
      ]}
    />
  );
}
