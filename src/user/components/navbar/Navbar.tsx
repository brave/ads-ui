import * as React from "react";

import {Link, useHistory} from "react-router-dom";

import {SignOut} from "../../../actions";
import TopBarProgress from "react-topbar-progress-indicator";


import {AppBar, Button, Toolbar} from "@mui/material";
import {UserMenu} from "./components/UserMenu/UserMenu";
import {connect} from "react-redux";

const logoStyle = {textDecoration: "none", color: "inherit", marginTop: "3px"};

TopBarProgress.config({
  barColors: {
    "0": "#FB7959"
  },
  shadowBlur: 0,
  shadowColor: undefined,
  barThickness: 2,
});

const NEW_CAMPAIGN_ADVERTISER_ALLOW_LIST = [
  "8cfac071-75f8-46ab-9c7f-4f8420d914d7",  // bsa
  "8fc27541-4933-447b-93eb-50b4e4714fbb",  // graham's test advertiser (staging)
  "93130af3-2def-4ecb-b836-b3772e73b3c9", // Fung (staging)
];

function shouldShowNewCampaign(advertiserId: string): boolean {
  return process.env.REACT_APP_ENABLE_FEATURES === "true" || NEW_CAMPAIGN_ADVERTISER_ALLOW_LIST.includes(advertiserId);
}

interface Props {
  advertiserId: string;
  userId: string;
  dispatch: any;
}

function Navbar({ advertiserId, dispatch, userId }: Props) {
  const history = useHistory();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}>
      <Toolbar>
        <Link style={logoStyle} to={"/home"}>
          <img
            src="/Subdomains_Rewards_Ads_Default.png"
            alt="Ads"
            height="40px"
          />
        </Link>
        <div style={{ flexGrow: 1 }} />
        {shouldShowNewCampaign(advertiserId) && (
          <Button
            onClick={() => history.push(`/user/main/adsmanager/advanced/new`)}
            size="large"
            variant="contained"
            sx={{ mr: 5 }}
          >
            New Campaign
          </Button>
        )}
        <UserMenu signOut={() => dispatch(SignOut())}/>
      </Toolbar>
    </AppBar>
  );
}

export default connect()(Navbar);
