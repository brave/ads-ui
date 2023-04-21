import React from "react";
import { Box, Button, Tab, Tabs, Typography } from "@mui/material";
import { EngagementChartType } from "../types";

interface HeaderProps {
  onSetGroup: (s: string) => void;
  onSetEngagement: (s: EngagementChartType) => void;
  grouping: string;
  engagement: string;
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

interface EngagementProps {
  value: string;
  onSetEngagement: (e: EngagementChartType) => void;
}

const Engagement = ({ value, onSetEngagement }: EngagementProps) => {
  return (
    <Box display="flex" flexDirection="row" alignItems="center" ml={1}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        Engagements:
      </Typography>
      <Tabs
        value={value}
        onChange={(event, newValue) => {
          onSetEngagement(newValue);
        }}
      >
        <Tab label="Campaign" value="campaign" />
        <Tab label="Ad Set" value="creativeset" />
        <Tab label="Creative" value="creative" />
      </Tabs>
    </Box>
  );
};

export default function EngagementHeader({
  onSetGroup,
  grouping,
  engagement,
  onSetEngagement,
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
        width: "100%",
        height: "50px",
        backgroundColor: "white",
        borderBottom: "1px solid #ededed",
        display: "flex",
        justifyContent: "center",
        paddingRight: "12px",
      }}
    >
      <Engagement value={engagement} onSetEngagement={onSetEngagement} />
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
