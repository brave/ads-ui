import { AppBar, Button, Divider, Stack, Toolbar } from "@mui/material";

import { DraftMenu } from "components/Navigation/DraftMenu";
import ads from "../../../branding.svg";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useSignOut } from "auth/hooks/mutations/useSignOut";
import { NewCampaignButton } from "components/Navigation/NewCampaignButton";
import { UploadImage } from "components/Assets/UploadImage";
import { useHistory } from "react-router-dom";
import { NewCreativeButton } from "components/Navigation/NewCreativeButton";

export function Navbar() {
  const { signOut } = useSignOut();
  const { advertiser } = useAdvertiser();
  const history = useHistory();

  const buttons = [
    {
      route: "user/main/campaign",
      component: <NewCampaignButton />,
    },
    {
      route: "user/main/assets",
      component: <UploadImage />,
    },
    {
      route: "user/main/creatives",
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
          {advertiser.selfServiceCreate && <DraftMenu />}
        </Stack>
        <div style={{ flexGrow: 1 }} />
        {
          buttons.find((b) => history.location.pathname.includes(b.route))
            ?.component
        }
        <Button variant="outlined" size="medium" onClick={() => signOut()}>
          Sign out
        </Button>
      </Toolbar>
    </AppBar>
  );
}
