import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";
import moment from "moment/moment";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

export function NewCampaignButton() {
  const { url } = useRouteMatch();
  const { advertiser } = useAdvertiser();
  const isCompletePage = url.includes("/user/main/complete/new");
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced");
  const newUrl = `/user/main/adsmanager/advanced/new/${moment()
    .utc()
    .valueOf()}/settings`;

  if (!advertiser.selfServiceCreate) {
    return null;
  }

  return (
    <Button
      size="medium"
      variant="contained"
      component={RouterLink}
      to={newUrl}
      sx={{ mr: 3 }}
      disabled={isNewCampaignPage || isCompletePage || !advertiser.agreed}
    >
      New Campaign
    </Button>
  );
}
