import * as React from "react";

import TopBarProgress from "react-topbar-progress-indicator";

import {
  AppBar,
  Button,
  Divider,
  Link,
  LinkProps,
  Stack,
  Toolbar,
} from "@mui/material";
import ads from "../../../branding.svg";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";

TopBarProgress.config({
  barColors: {
    "0": "#FB7959",
  },
  shadowBlur: 0,
  shadowColor: undefined,
  barThickness: 2,
});

export function LandingPageAppBar() {
  const match = useRouteMatch();

  const links = [
    {
      component: <HelpLink label="Get Started" props={{ href: "/register" }} />,
    },
    {
      component: (
        <HelpLink
          label="Learn"
          props={{
            href: "https://brave.com/brave-ads/resources/",
            target: "_blank",
          }}
        />
      ),
    },
    {
      component: (
        <HelpLink
          label="Support"
          props={{ href: "mailto:selfserve@brave.com" }}
        />
      ),
    },
  ];

  return (
    <AppBar
      position="fixed"
      sx={{
        bgcolor: "rgba(252, 252, 253, 0.65)",
        boxShadow: "none",
        height: "74px",
        justifyContent: "center",
      }}
    >
      <Toolbar>
        <Stack direction="row" alignItems="center" spacing={2}>
          <RouterLink to="/" style={{ marginTop: 5 }}>
            <img src={ads} alt="Ads" height="31px" width="180px" />
          </RouterLink>
          <Divider orientation="vertical" flexItem />
          <Stack direction="row" spacing={5}>
            {links.map((l) => l.component)}
          </Stack>
        </Stack>
        <div style={{ flexGrow: 1 }} />
        {!match.url.includes("auth") && (
          <Button
            variant="outlined"
            size="large"
            sx={{ textTransform: "none" }}
            href="/auth/link"
          >
            Log in
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

interface HelpProps {
  label: string;
  props: LinkProps;
}

function HelpLink({ label, props }: HelpProps) {
  return (
    <Link variant="subtitle1" underline="none" color="text.primary" {...props}>
      {label}
    </Link>
  );
}
