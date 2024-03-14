import { Alert } from "@mui/material";
import { Trans } from "@lingui/macro";
import { DashboardButton } from "components/Button/DashboardButton";

export function ConsultAccountManager() {
  return (
    <>
      <DashboardButton />

      <Alert
        severity="info"
        sx={{ mt: 2, mb: 2, maxWidth: "800px", alignItems: "center" }}
      >
        <Trans>
          Please ask your Account Manager for reports on campaigns of this
          format.
        </Trans>
      </Alert>
    </>
  );
}
