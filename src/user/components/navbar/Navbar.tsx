import * as React from "react";

import {Link, useHistory} from "react-router-dom";

import {SignOut} from "../../../actions";
import TopBarProgress from "react-topbar-progress-indicator";
import "./style/Navbar.style.css"


import {AppBar, Box, Button, Toolbar, Typography} from "@mui/material";
import {UserMenu} from "./components/UserMenu/UserMenu";
import {connect} from "react-redux";

const linkStyle = {textDecoration: "none", color: "inherit"};
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
  signOut: any;
}

function Navbar({ advertiserId, signOut, userId }: Props) {
  const history = useHistory();

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}>
      <Toolbar>
        <Link style={logoStyle} to={"/home"}>
          <img src="/Subdomains_Rewards_Ads_Default.png" alt="Ads" height="50px" width="500px"/>
        </Link>
        <div style={{ flexGrow: 1 }} />
        {shouldShowNewCampaign(advertiserId) && (
          <Button
            onClick={() => history.push(`/user/main/adsmanager/selection?userId=${userId}&advertiserId=${advertiserId}`)}
            size="large"
            variant="contained"
            sx={{ mr: 5 }}
          >
            New Campaign
          </Button>
        )}
        <UserMenu signOut={signOut}/>
      </Toolbar>
    </AppBar>
  );
}

const mapDispatchToProps = (dispatch: any) => ({
  signOut: () => dispatch(SignOut()),
});

export default connect(
  mapDispatchToProps
)(Navbar);
