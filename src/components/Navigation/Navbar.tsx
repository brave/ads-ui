import * as React from "react";

import { useHistory, useRouteMatch } from "react-router-dom";

import TopBarProgress from "react-topbar-progress-indicator";

import {
  AppBar,
  Button,
  Divider,
  Link,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import moment from "moment";
import ads from "../../../brave-ads-black.svg";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { DraftMenu } from "components/Navigation/DraftMenu";
import { UserMenu } from "components/Navigation/UserMenu";

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
    .valueOf()}/settings`;

  return (
    <AppBar
      position="fixed"
      sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, bgcolor: "#ffffff" }}
    >
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={ads} alt="Ads" height="31px" width="180px" />
          <Divider orientation="vertical" flexItem />
          {advertiser.selfServiceCreate && (
            <>
              <DraftMenu />
              <div>
                <Typography color="black" variant="body2">
                  Need Help?
                  <Link
                    sx={{ ml: 1 }}
                    href="mailto:selfserve@brave.com"
                    underline="none"
                  >
                    selfserve@brave.com
                  </Link>
                </Typography>
              </div>
            </>
          )}
        </Stack>
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
