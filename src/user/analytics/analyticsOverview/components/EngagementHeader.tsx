import { Text } from "../../../../components/Text/Text";
import React from "react";
import { Box, Button } from "@mui/material";

interface HeaderProps {
  onClick: (s: string) => void;
  grouping: string;
}

type GroupProps = HeaderProps & {
  label: string;
  group: string;
};

type Group = Pick<GroupProps, "label" | "group">;

const Grouping = ({ onClick, label, group, grouping }: GroupProps) => {
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
      onClick={() => onClick(group)}
    >
      {label}
    </Button>
  );
};

export default function EngagementHeader({ onClick, grouping }: HeaderProps) {
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
        height: "56px",
        backgroundColor: "white",
        borderBottom: "1px solid #ededed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        paddingRight: "12px",
      }}
    >
      <Text
        style={{ marginLeft: "40px" }}
        content={"Campaign Engagement"}
        fontFamily={"Poppins"}
        sizes={[18, 18, 42, 42, 14]}
      />
      {groups.map((g) => (
        <Grouping
          onClick={onClick}
          grouping={grouping}
          label={g.label}
          group={g.group}
          key={g.group}
        />
      ))}
    </Box>
  );
}
