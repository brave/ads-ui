import { useBreakdownParams } from "../hooks";
import { BREAKDOWNS } from "../breakdowns";
import { useLingui } from "@lingui/react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import { msg } from "@lingui/macro";

export function VerticalBreakdown() {
  const { _ } = useLingui();
  const [value, setValue] = useState(1);
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
        width: "130px",
        height: "100%",
        borderRight: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={(e, nv) => {
          setValue(nv);
          setSelected(breakdowns[nv - 1]);
        }}
        sx={{ alignItems: "left" }}
      >
        <Tab
          label={_(msg`Breakdowns`)}
          disabled
          sx={{
            alignItems: "start",
            "&.Mui-disabled": {
              color: "black",
              fontWeight: 600,
            },
          }}
        />
        {breakdowns.map((b) => (
          <Tab label={b.label} sx={{ alignItems: "start" }} />
        ))}
      </Tabs>
    </Box>
  );
}
