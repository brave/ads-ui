import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ads from "@/assets/images/logo.svg";
import adsWhite from "@/assets/images/logo-white.svg";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { useSignOut } from "@/auth/hooks/mutations/useSignOut";
import { useIsMobile } from "@/hooks/useIsMobile";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { SupportMenu } from "@/components/Drawer/SupportMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";

export function LandingPageAppBar() {
  const match = useRouteMatch();
  const { _ } = useLingui();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  const isHome = match.url === "/";

  const GetStarted = () => (
    <RouterLink to={"/register/browser"} style={{ textDecoration: "none" }}>
      <Typography
        variant={isMobile ? "body2" : "subtitle1"}
        color={"secondary"}
      >
        <Trans>Sign up</Trans>
      </Typography>
    </RouterLink>
  );

  const links = [
    {
      component: isAuthenticated ? null : <GetStarted />,
    },
    {
      component: (
        <RouterLink to={`/bat`} style={{ textDecoration: "none" }}>
          <Typography
            variant={isMobile ? "body2" : "subtitle1"}
            color="text.primary"
          >
            <Trans>Basic Attention Token</Trans>
          </Typography>
        </RouterLink>
      ),
    },
    {
      component: (
        <RouterLink to={`/search`} style={{ textDecoration: "none" }}>
          <Typography
            variant={isMobile ? "body2" : "subtitle1"}
            color="text.primary"
          >
            <Trans>Brave Search Ads</Trans>
          </Typography>
        </RouterLink>
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(252, 252, 253, 0)",
          boxShadow: "none",
          height: { md: "74px" },
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", flexGrow: 1 }}>
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, md: 3 }}
            justifyContent="space-between"
          >
            <RouterLink to="/" style={{ marginTop: 5 }}>
              <img
                src={isHome ? adsWhite : ads}
                alt={_(msg`Ads`)}
                height="31px"
                width="180px"
              />
            </RouterLink>

            <Divider orientation="vertical" flexItem />
            {!isMobile && (
              <>
                {links.map((l, i) => (
                  <div key={`menu_component_${i}`}>{l.component}</div>
                ))}
                <SupportMenu usePlainLink />
              </>
            )}
          </Stack>
          <div style={{ flexGrow: 1 }} />
          {!match.url.includes("auth") && (
            <AuthedButton isAuthenticated={isAuthenticated} />
          )}
          {isMobile && (
            <MobileMenu links={links} isAuthenticated={isAuthenticated} />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

function AuthedButton(props: { isAuthenticated?: boolean }) {
  const { signOut } = useSignOut();

  return (
    <Button
      variant="contained"
      size="large"
      component={RouterLink}
      to={!props.isAuthenticated ? "/auth/link" : "/"}
      onClick={props.isAuthenticated ? () => signOut() : undefined}
    >
      {props.isAuthenticated ? <Trans>Sign out</Trans> : <Trans>Log in</Trans>}
    </Button>
  );
}

function MobileMenu(props: { links: any[]; isAuthenticated?: boolean }) {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

  return (
    <Box
      sx={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "flex-end",
        width: "100%",
        alignItems: "center",
      }}
    >
      <div style={{ marginLeft: 15 }} />
      <SupportMenu usePlainLink />
      <div style={{ flexGrow: 1 }} />
      <IconButton size="large" onClick={(e) => setAnchorElNav(e.currentTarget)}>
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={() => setAnchorElNav(null)}
        sx={{
          display: { xs: "block", md: "none" },
        }}
      >
        <MenuItem
          component={RouterLink}
          to={!props.isAuthenticated ? "/auth/link" : "/"}
        >
          <Typography variant={"body2"} color="text.primary">
            <Trans>Log in</Trans>
          </Typography>
        </MenuItem>
        <Divider />
        {props.links.map((l, i) => (
          <MenuItem key={`menu_item_${i}`} onClick={() => setAnchorElNav(null)}>
            {l.component}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
