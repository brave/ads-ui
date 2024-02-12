import {
  AppBar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import ads from "../../../logo.svg";
import { Link as RouterLink, useRouteMatch } from "react-router-dom";
import { useIsAuthenticated } from "auth/hooks/queries/useIsAuthenticated";
import { useSignOut } from "auth/hooks/mutations/useSignOut";
import { SupportMenu } from "components/Drawer/MiniSideBar";
import { useIsMobile } from "hooks/useIsMobile";

export function LandingPageAppBar() {
  const match = useRouteMatch();
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  const isContact = match.url.includes("contact");
  const isSearch = match.url.includes("search");
  const isBAT = match.url.includes("bat");

  const GetStarted = () => (
    <RouterLink
      to={`/register${isContact ? "?pos=personal" : ""}`}
      style={{ textDecoration: "none" }}
    >
      <Typography
        variant={isMobile ? "body2" : "subtitle1"}
        color={isContact ? "primary" : "text.primary"}
      >
        {isContact ? "Register for Self-service" : "Get started"}
      </Typography>
    </RouterLink>
  );

  const links = [
    {
      component:
        (isMobile && !isSearch) || isAuthenticated ? null : <GetStarted />,
    },
    {
      component: !isSearch ? (
        <RouterLink to={`/search`} style={{ textDecoration: "none" }}>
          <Typography
            variant={isMobile ? "body2" : "subtitle1"}
            color="text.primary"
          >
            Brave Search
          </Typography>
        </RouterLink>
      ) : undefined,
    },
    {
      component: !isBAT ? (
        <RouterLink to={`/bat`} style={{ textDecoration: "none" }}>
          <Typography
            variant={isMobile ? "body2" : "subtitle1"}
            color="text.primary"
          >
            Basic Attention Token
          </Typography>
        </RouterLink>
      ) : undefined,
    },
    {
      component: <SupportMenu usePlainLink />,
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: "rgba(252, 252, 253, 0.65)",
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
              <img src={ads} alt="Ads" height="31px" width="180px" />
            </RouterLink>

            <Divider orientation="vertical" flexItem />
            {links.map((l) => l.component)}
          </Stack>
          <div style={{ flexGrow: 1 }} />
          {!isMobile && !match.url.includes("auth") && (
            <AuthedButton isAuthenticated={isAuthenticated} />
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
      variant="outlined"
      size="large"
      component={RouterLink}
      to={!props.isAuthenticated ? "/auth/link" : "/"}
      onClick={props.isAuthenticated ? () => signOut() : undefined}
    >
      {props.isAuthenticated ? "Sign out" : "Log in"}
    </Button>
  );
}
