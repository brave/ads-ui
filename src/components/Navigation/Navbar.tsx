import { AppBar, Divider, Stack, Toolbar } from "@mui/material";

import { DraftMenu } from "@/components/Navigation/DraftMenu";
import adsManage from "@/assets/images/logo.svg";
import adsReporting from "@/assets/images/logo-reporting.svg";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { NewCampaignButton } from "@/components/Navigation/NewCampaignButton";
import { useHistory } from "react-router-dom";
import { NewCreativeButton } from "@/components/Navigation/NewCreativeButton";
import { AccountMenu } from "@/components/Navigation/AccountMenu";

export function Navbar() {
  const { advertiser } = useAdvertiser();
  const history = useHistory();

  const buttons = [
    {
      route: "/user/main/campaign",
      component: <NewCampaignButton />,
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
          {advertiser.selfServiceManageCampaign ? (
            <img src={adsManage} alt="Ads" height="31px" width="180px" />
          ) : (
            <img src={adsReporting} alt="Ads" height="31px" width="180px" />
          )}
          <Divider orientation="vertical" flexItem />
          {advertiser.selfServiceManageCampaign && <DraftMenu />}
        </Stack>
        <div style={{ flexGrow: 1 }} />
        {buttons.find((b) => history.location.pathname === b.route)?.component}
        <AccountMenu />
      </Toolbar>
    </AppBar>
  );
}
