import * as React from "react";

import { Link, useHistory } from "react-router-dom";

import { SignOut } from "../../../actions";
import TopBarProgress from "react-topbar-progress-indicator";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import { UserMenu } from "./components/UserMenu/UserMenu";
import { connect } from "react-redux";
import { nanoid } from "nanoid/non-secure";
import DraftsIcon from "@mui/icons-material/Drafts";

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
  dispatch: any;
  canCreate: boolean;
}

function Navbar({ dispatch, canCreate }: Props) {
  const history = useHistory();

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}
    >
      <Toolbar>
        <Link style={logoStyle} to={"/home"}>
          <img
            src="/Subdomains_Rewards_Ads_Default.png"
            alt="Ads"
            height="40px"
          />
        </Link>
        {canCreate && (
          <Tooltip title="Drafts">
            <IconButton>
              <Badge color="primary" badgeContent={1}>
                <DraftsIcon fontSize="large" />
              </Badge>
            </IconButton>
          </Tooltip>
        )}
        <div style={{ flexGrow: 1 }} />
        {canCreate && (
          <Button
            onClick={() =>
              history.push(`/user/main/adsmanager/advanced/new/${nanoid(10)}`)
            }
            size="large"
            variant="contained"
            sx={{ mr: 5 }}
            disabled={history.location.pathname.includes(
              "/user/main/adsmanager/advanced/new"
            )}
          >
            New Campaign
          </Button>
        )}
        <UserMenu
          signOut={() => {
            localStorage.removeItem("persist:root");
            dispatch(SignOut());
          }}
        />
      </Toolbar>
    </AppBar>
  );
}

export default connect()(Navbar);
