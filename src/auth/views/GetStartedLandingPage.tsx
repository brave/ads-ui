import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";
import { Link as RouterLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";

export function GetStartedLandingPage() {
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();

  return (
    <Stack maxWidth="700px" spacing={3}>
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

      <Box display="flex" flexDirection="row" alignItems="center" gap="10px">
        <Button
          variant="contained"
          component={RouterLink}
          sx={{
            width: "180px",
            maxHeight: { xs: "40px", md: "60px" },
            mb: 1,
            fontSize: "18px",
          }}
          to={isAuthenticated ? "/user/main" : "/register/browser"}
        >
          {isAuthenticated ? (
            <Trans>Dashboard</Trans>
          ) : (
            <Trans>Get started</Trans>
          )}
        </Button>
        {!isMobile && !isAuthenticated && (
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
