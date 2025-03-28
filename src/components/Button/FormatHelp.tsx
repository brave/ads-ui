import { IconButton } from "@mui/material";
import HelpIcon from "@mui/icons-material/Help";

export function FormatHelp() {
  return (
    <IconButton
      size="small"
      onClick={() =>
        window.open(
          "https://brave.com/brave-ads/",
          "__blank",
          "noopener",
        )
      }
    >
      <HelpIcon fontSize="small" />
    </IconButton>
  );
}
