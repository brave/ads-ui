import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export function NewCreativeButton() {
  const { advertiser } = useAdvertiser();

  if (!advertiser.selfServiceCreate) {
    return null;
  }

  return (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={`/user/main/creative/new`}
      sx={{ mr: 3 }}
      disabled={!advertiser.agreed}
    >
      New Creative
    </Button>
  );
}
