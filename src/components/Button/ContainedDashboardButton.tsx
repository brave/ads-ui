import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";

export function ContainedDashboardButton() {
  return (
    <Button variant="outlined" component={RouterLink} to="/user/main">
      <Trans>Dashboard</Trans>
    </Button>
  );
}
