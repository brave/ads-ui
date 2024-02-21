import { AppBar, Button, Divider, Stack, Toolbar } from "@mui/material";

import { DraftMenu } from "components/Navigation/DraftMenu";
import ads from "../../../logo.svg";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useSignOut } from "auth/hooks/mutations/useSignOut";
import { NewCampaignButton } from "components/Navigation/NewCampaignButton";
import { UploadImage } from "components/Assets/UploadImage";
import { useHistory } from "react-router-dom";
import { NewCreativeButton } from "components/Navigation/NewCreativeButton";
import { Trans } from "@lingui/macro";

export function Navbar() {
  const { signOut } = useSignOut();
  const { advertiser } = useAdvertiser();
  const history = useHistory();

  const buttons = [
    {
      route: "/user/main/campaign",
      component: <NewCampaignButton />,
    },
    {
      route: "/user/main/ads/assets",
      component: <UploadImage />,
    },
    {
      route: "/user/main/ads",
      component: <NewCreativeButton />,
    },
  ];

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
          {advertiser.selfServiceManageCampaign && <DraftMenu />}
        </Stack>
        <div style={{ flexGrow: 1 }} />
        {buttons.find((b) => history.location.pathname === b.route)?.component}
        <Button variant="outlined" size="medium" onClick={() => signOut()}>
          <Trans>Sign out</Trans>
        </Button>
      </Toolbar>
    </AppBar>
  );
}
