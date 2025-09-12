import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { Link as RouterLink } from "react-router-dom";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import adFormats from "@/assets/images/ad-formats-hero@1x.png";

export function GetStartedLandingPage() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Stack spacing={3} paddingX={{ xs: 1, xl: 0 }}>
      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="center"
        spacing={2}
      >
        <Stack direction="column" maxWidth="700px">
          <Typography variant="h1" textAlign="left" color="white">
            <Trans>
              Simple ads to reach digital trend-setters around the world
            </Trans>
          </Typography>

          <Typography variant="h4" color="white">
            <Trans>
              Get to your first million users with powerful ad placements on the
              world’s fastest-growing alternative browser & search engine.
            </Trans>
          </Typography>
        </Stack>
        <img
          src={adFormats}
          style={{
            height: 287,
            width: "100%",
            maxWidth: "600px",
            objectFit: "contain",
          }}
        />
      </Stack>

      <Box display="flex" flexDirection="row" alignItems="baseline" gap="10px">
        <Button
          variant="contained"
          component={RouterLink}
          sx={{
            width: "180px",
            maxHeight: { xs: "40px", md: "60px" },
            fontSize: "18px",
            p: 1.5,
          }}
          to={isAuthenticated ? "/user/main" : "/register/browser"}
        >
          {isAuthenticated ? (
            <Trans>Dashboard</Trans>
          ) : (
            <Trans>Get started</Trans>
          )}
        </Button>
        {!isAuthenticated && (
          <Typography variant="subtitle1">
            <Link
              variant="subtitle1"
              color="#fff"
              component={RouterLink}
              to="/auth/link"
              sx={{ ml: 1, fontSize: "18px" }}
            >
              <Trans>Log in</Trans>
            </Link>
          </Typography>
        )}
      </Box>
    </Stack>
  );
}
