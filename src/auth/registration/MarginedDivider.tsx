import { useIsMobile } from "hooks/useIsMobile";
import { Divider } from "@mui/material";

export function MarginedDivider() {
  const isMobile = useIsMobile();
  return (
    <Divider
      sx={{ marginTop: isMobile ? 2 : 5, marginBottom: isMobile ? 2 : 5 }}
    />
  );
}
