import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { Button } from "@mui/material";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { Trans } from "@lingui/macro";
import dayjs from "dayjs";

export function NewCampaignButton() {
  const { url } = useRouteMatch();
  const { advertiser } = useAdvertiser();
  const isCompletePage = url.includes("/user/main/complete/new");
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced");
  const newUrl = `/user/main/adsmanager/advanced/new/${dayjs()
    .utc()
    .valueOf()}/settings`;

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
      disabled={isNewCampaignPage || isCompletePage || !advertiser.agreed}
    >
      <Trans>New Campaign</Trans>
    </Button>
  );
}
