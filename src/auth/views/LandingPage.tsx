import { Background } from "@/components/Background/Background";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { useIsAuthenticated } from "@/auth/hooks/queries/useIsAuthenticated";
import { Link as RouterLink } from "react-router-dom";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MobileAdsBenefits } from "@/auth/views/MobileAdsBenefits";
import { GradientText } from "@/components/Typography/GradientText";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { findLocale } from "@/i18n";

export function LandingPage() {
  useTrackMatomoPageView({ documentTitle: "Landing Page" });
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();
  const { _ } = useLingui();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 1 }} />
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        justifyContent="center"
      >
        <Stack sx={{ maxWidth: "550px" }} spacing={3}>
          <Typography variant="h3" textAlign="left">
            <GradientText text={msg`Privacy-forward`} />{" "}
            {_(msg`advertising made simple`)}
          </Typography>

          <Typography variant="h6">
            <Trans>
              Reach and convert new customers through premium advertising on the
              Brave browser and search engine.
            </Trans>
          </Typography>

          {!isAuthenticated && (
            <Typography variant="subtitle1" color="primary" fontWeight={500}>
              <Trans>
                Get 50% your first campaign when you pay in Basic Attention
                Token
              </Trans>
            </Typography>
          )}

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              component={RouterLink}
              sx={{
                maxWidth: { md: "165px" },
                maxHeight: { xs: "40px", md: "60px" },
                padding: { xs: 2, md: "18px 24px 18px 24px" },
                mb: 1,
              }}
              to={isAuthenticated ? "/user/main" : "/register"}
            >
              {isAuthenticated ? (
                <Trans>Dashboard</Trans>
              ) : (
                <Trans>Get started</Trans>
              )}
            </Button>
            {!isMobile && !isAuthenticated && (
              <Typography variant="subtitle1">
                <Trans>Already have an account?</Trans>
                <Link
                  variant="subtitle1"
                  underline="none"
                  color="secondary"
                  component={RouterLink}
                  to="/auth/link"
                  sx={{ ml: 1 }}
                >
                  <Trans>Log in</Trans>
                </Link>
              </Typography>
            )}
          </Box>

          {isMobile && <MobileAdsBenefits />}
        </Stack>
        {!isMobile && (
          <Box height="100%" width={600}>
            <img src={findLocale().images.benefits} />
          </Box>
        )}
      </Stack>
    </Background>
  );
}
