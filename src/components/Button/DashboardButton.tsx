import { Button } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";

export function DashboardButton() {
  return (
    <Button
      variant="text"
      startIcon={<ArrowBack />}
      component={RouterLink}
      to="/user/main"
    >
      <Trans>Dashboard</Trans>
    </Button>
  );
}
