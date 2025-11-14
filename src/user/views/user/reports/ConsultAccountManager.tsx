import { Alert } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";

export function ConsultAccountManager() {
  useTrackMatomoPageView({ documentTitle: "Consult Account Manager" });

  return (
    <Alert
      severity="info"
      sx={{ mt: 2, mb: 2, maxWidth: "800px", alignItems: "center" }}
    >
      Please ask your Account Manager for reports on campaigns of this format.
    </Alert>
  );
}
