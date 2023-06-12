import * as React from "react";

import { Link, useHistory, useRouteMatch } from "react-router-dom";

import TopBarProgress from "react-topbar-progress-indicator";

import { AppBar, Button, Toolbar } from "@mui/material";
import { UserMenu } from "user/components/navbar/components/UserMenu";
import { DraftMenu } from "user/components/navbar/components/DraftMenu";
import moment from "moment";
import rewards from "../../../../Subdomains_Rewards_Ads_Default.png";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

const logoStyle = {
  textDecoration: "none",
  color: "inherit",
  marginTop: "3px",
};

TopBarProgress.config({
  barColors: {
    "0": "#FB7959",
  },
  shadowBlur: 0,
  shadowColor: undefined,
  barThickness: 2,
});

export function Navbar() {
  const { advertiser } = useAdvertiser();
  const history = useHistory();
  const { url } = useRouteMatch();
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced");
  const isCompletePage = url.includes("/user/main/complete/new");
  const newUrl = `/user/main/adsmanager/advanced/new/${moment()
    .utc()
    .valueOf()}`;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}
    >
      <Toolbar>
        <Link style={logoStyle} to="/user/main">
          <img src={rewards} alt="Ads" height="40px" />
        </Link>
        {advertiser.selfServiceCreate && <DraftMenu />}
        <div style={{ flexGrow: 1 }} />
        {advertiser.selfServiceCreate && (
          <Button
            onClick={() => history.push(newUrl)}
            size="medium"
            variant="contained"
            sx={{ mr: 5 }}
            disabled={isNewCampaignPage || isCompletePage || !advertiser.agreed}
          >
            New Campaign
          </Button>
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
