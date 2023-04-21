import * as React from "react";

import { Link, useHistory, useRouteMatch } from "react-router-dom";

import TopBarProgress from "react-topbar-progress-indicator";

import { AppBar, Button, Toolbar } from "@mui/material";
import { UserMenu } from "./components/UserMenu/UserMenu";
import { DraftMenu } from "./components/DraftMenu/DraftMenu";
import moment from "moment";
import rewards from "../../../../Subdomains_Rewards_Ads_Default.png";

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

interface Props {
  canCreate: boolean;
}

export function Navbar({ canCreate }: Props) {
  const history = useHistory();
  const { url } = useRouteMatch();
  const isNewCampaignPage = url.includes("/user/main/adsmanager/advanced/new");

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}
    >
      <Toolbar>
        <Link style={logoStyle} to="/user/main">
          <img src={rewards} alt="Ads" height="40px" />
        </Link>
        {canCreate && <DraftMenu />}
        <div style={{ flexGrow: 1 }} />
        {canCreate && (
          <>
            <Button
              onClick={() => {
                history.push(
                  `/user/main/adsmanager/advanced/new/${moment()
                    .utc()
                    .valueOf()}`
                );
              }}
              size="medium"
              variant="contained"
              sx={{ mr: 5 }}
              disabled={isNewCampaignPage}
            >
              New Campaign
            </Button>
          </>
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
