import { useRouteMatch, Link as RouterLink } from "react-router-dom";

import { AppBar, Button, Divider, Stack, Toolbar } from "@mui/material";

import { DraftMenu } from "components/Navigation/DraftMenu";
import moment from "moment";
import ads from "../../../branding.svg";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useSignOut } from "auth/hooks/mutations/useSignOut";

export function Navbar() {
  const { signOut } = useSignOut();
  const { advertiser } = useAdvertiser();
  const { url } = useRouteMatch();
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced");
  const isCompletePage = url.includes("/user/main/complete/new");
  const newUrl = `/user/main/adsmanager/advanced/new/${moment()
    .utc()
    .valueOf()}/settings`;

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 1,
        bgcolor: "#ffffff",
        height: "72px",
        justifyContent: "center",
        boxShadow: "none",
      }}
    >
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={ads} alt="Ads" height="31px" width="180px" />
          <Divider orientation="vertical" flexItem />
          {advertiser.selfServiceCreate && <DraftMenu />}
        </Stack>
        <div style={{ flexGrow: 1 }} />
        {advertiser.selfServiceCreate && (
          <Button
            component={RouterLink}
            to={newUrl}
            size="medium"
            variant="contained"
            sx={{ mr: 3 }}
            disabled={isNewCampaignPage || isCompletePage || !advertiser.agreed}
          >
            New Campaign
          </Button>
        )}
        <Button variant="outlined" size="medium" onClick={() => signOut()}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
