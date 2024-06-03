import { useBreakdownParams } from "../hooks";
import { BREAKDOWNS } from "../breakdowns";
import { useLingui } from "@lingui/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";

export function VerticalBreakdown() {
  const { _ } = useLingui();
  const [value, setValue] = useState(0);
  const { selected, setSelected, forceDefaultBreakdownSelection } =
    useBreakdownParams();
  const breakdowns = BREAKDOWNS.map((item) => ({
    ...item,
    label: _(item.label),
  }));

  if (!selected) {
    forceDefaultBreakdownSelection();
    return null;
  }

  return (
    <Box
      sx={{
        width: "85px",
        height: "100%",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        orientation="vertical"
        value={value}
        onChange={(e, nv) => {
          setValue(nv);
          setSelected(breakdowns[nv]);
        }}
        sx={{ alignItems: "left" }}
      >
        {breakdowns.map((b) => (
          <Tab
            label={b.label}
            sx={{ alignItems: "start", color: "text.primary" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
