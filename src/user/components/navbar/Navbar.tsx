import * as React from "react";

import { Link,  } from "react-router-dom";

import TopBarProgress from "react-topbar-progress-indicator";

import { AppBar, Toolbar } from "@mui/material";
import { UserMenu } from "user/components/navbar/components/UserMenu";
import { DraftMenu } from "user/components/navbar/components/DraftMenu";
import rewards from "../../../../Subdomains_Rewards_Ads_Default.png";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import AgreedModal from "user/components/navbar/components/AgreedModal";

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
          <AgreedModal advertiser={advertiser} />
        )}
        <UserMenu />
      </Toolbar>
    </AppBar>
  );
}
