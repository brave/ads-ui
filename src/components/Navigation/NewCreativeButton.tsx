import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

export function NewCreativeButton() {
  const newUrl = "/user/main/creative/new";
  const { url } = useRouteMatch();
  const { advertiser } = useAdvertiser();
  const isNewCreativePage = url.includes(newUrl);

  if (!advertiser.selfServiceManageCampaign) {
    return null;
  }

  return (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={newUrl}
      sx={{ mr: 3 }}
      disabled={isNewCreativePage || !advertiser.agreed}
    >
      New Ad
    </Button>
  );
}
