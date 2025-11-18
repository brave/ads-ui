import { useBreakdownParams } from "../hooks";
import { BREAKDOWNS } from "../breakdowns";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

export function VerticalBreakdown() {
  const { selected, setSelected, forceDefaultBreakdownSelection } =
    useBreakdownParams();
  const breakdowns = BREAKDOWNS.map((item) => ({
    ...item,
    label: item.label,
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
        value={breakdowns.findIndex((b) => b.id === selected.id)}
        onChange={(e, nv) => {
          setSelected(breakdowns[nv]);
        }}
        sx={{ alignItems: "left" }}
      >
        {breakdowns.map((b, i) => (
          <Tab
            value={i}
            key={b.id}
            label={b.label}
            sx={{ alignItems: "start", color: "text.primary" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
