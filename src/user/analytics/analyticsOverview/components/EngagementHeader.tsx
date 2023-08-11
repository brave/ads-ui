import { Box, Button, Stack, Typography } from "@mui/material";
import { Status } from "components/Campaigns/Status";
import { CampaignSummaryFragment } from "graphql/campaign.generated";

interface HeaderProps {
  onSetGroup: (s: string) => void;
  grouping: string;
  campaign: Pick<
    CampaignSummaryFragment,
    "startAt" | "endAt" | "state" | "name"
  >;
}

interface GroupProps {
  onSetGroup: (s: string) => void;
  label: string;
  group: string;
  grouping: string;
}

type Group = Pick<GroupProps, "label" | "group">;

const Grouping = ({ onSetGroup, label, group, grouping }: GroupProps) => {
  return (
    <Button
      sx={{
        fontSize: "14px",
        fontFamily: "Poppins",
        marginRight: "15px",
        marginLeft: group === "hourly" ? "auto" : "0",
        cursor: "pointer",
        color: grouping === group ? "#FB7959;" : "black;",
      }}
      onClick={() => onSetGroup(group)}
    >
      {label}
    </Button>
  );
};

export default function EngagementHeader({
  onSetGroup,
  grouping,
  campaign,
}: HeaderProps) {
  const groups: Group[] = [
    { label: "Hour", group: "hourly" },
    { label: "Day", group: "daily" },
    { label: "Week", group: "weekly" },
    { label: "Month", group: "monthly" },
  ];

  return (
    <Box
      sx={{
        height: "50px",
        backgroundColor: "white",
        display: "flex",
        justifyContent: "center",
        paddingRight: "12px",
        borderRadius: "12px",
      }}
    >
      <Stack direction="row" spacing={2} p={2} alignItems="center">
        <Typography variant="h2">{campaign.name}</Typography>
        <Status
          state={campaign.state}
          start={campaign.startAt}
          end={campaign.endAt}
        />
      </Stack>
      {groups.map((g) => (
        <Grouping
          onSetGroup={onSetGroup}
          grouping={grouping}
          label={g.label}
          group={g.group}
          key={g.group}
        />
      ))}
    </Box>
  );
}
