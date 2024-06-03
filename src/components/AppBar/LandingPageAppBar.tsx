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
import brave from "@/assets/images/full-brave-brand.svg";
import braveDark from "@/assets/images/full-brave-brand-black.svg";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { useSignOut } from "@/auth/hooks/mutations/useSignOut";
import { useIsMobile } from "@/hooks/useIsMobile";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { SupportMenu } from "@/components/Drawer/SupportMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import { PageLink } from "@/components/AppBar/PageLink";

export function LandingPageAppBar() {
  const match = useRouteMatch();
  const { _ } = useLingui();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  const isContact = match.path === "/contact";
  const textColor = isContact ? "text.primary" : "white";

  const links = [
    {
      component: (
        <PageLink
          to="/register/browser"
          msg={msg`Get started`}
          textColor={textColor}
        />
      ),
    },
    {
      component: (
        <PageLink
          to="/search"
          msg={msg`Brave Search Ads`}
          textColor={textColor}
        />
      ),
    },
    {
      component: (
        <PageLink
          to="/bat"
          msg={msg`Basic Attention Token`}
          textColor={textColor}
        />
      ),
    },
    {
      component: (
        <PageLink
          to="/contact"
          msg={msg`Contact sales`}
          textColor={textColor}
        />
      ),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="absolute"
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
            <Box component={RouterLink} to="/" width={100} display="flex">
              <img
                src={isContact ? braveDark : brave}
                alt={_(msg`Ads`)}
                height={30}
                width={100}
              />
            </Box>

            <Divider
              orientation="vertical"
              flexItem
              sx={{ bgcolor: "white" }}
            />
            {!isMobile && (
              <>
                {links.map((l, i) => (
                  <div key={`menu_component_${i}`}>{l.component}</div>
                ))}
                <SupportMenu usePlainLink linkColor={textColor} />
              </>
            )}
          </Stack>
          <div style={{ flexGrow: 1 }} />
          {!isMobile && <AuthedButton isAuthenticated={isAuthenticated} />}
          {isMobile && (
            <MobileMenu
              links={links}
              isAuthenticated={isAuthenticated}
              linkColor={textColor}
              isContact={isContact}
            />
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

function MobileMenu(props: {
  links: any[];
  isAuthenticated?: boolean;
  linkColor: string;
  isContact?: boolean;
}) {
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
      <SupportMenu usePlainLink linkColor={props.linkColor} />
      <div style={{ flexGrow: 1 }} />
      <IconButton size="large" onClick={(e) => setAnchorElNav(e.currentTarget)}>
        <MenuIcon sx={{ color: props.isContact ? "black" : "white" }} />
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
          <MenuItem key={`menu_component_${i}`}>{l.component}</MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
