import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export type TabStatus =
  | "draft"
  | "under_review"
  | "in_progress"
  | "complete"
  | "all";

interface Props {
  onChange: (s: TabStatus) => void;
  defaultStatus?: TabStatus;
  hideTabs?: TabStatus[];
}

export default function StatusTabs({
  onChange,
  defaultStatus,
  hideTabs,
}: Props) {
  const [value, setValue] = React.useState(defaultStatus ?? "draft");

  const handleChange = (event: React.SyntheticEvent, newValue: TabStatus) => {
    onChange(newValue);
    setValue(newValue);
  };

  const defaultTabs: { value: TabStatus; label: string }[] = [
    { value: "all", label: "All" },
    { value: "draft", label: "Draft" },
    { value: "under_review", label: "Under Review" },
    { value: "in_progress", label: "In Progress" },
    { value: "complete", label: "Complete" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 1 }}>
        <Tabs value={value} onChange={handleChange}>
          {defaultTabs.map((t) => {
            if (hideTabs && hideTabs.includes(t.value)) {
              return null;
            }

            return <Tab label={t.label} value={t.value} />;
          })}
        </Tabs>
      </Box>
    </Box>
  );
}
