import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import goals from "../../../images.svg";
import { useIsAuthenticated } from "auth/hooks/queries/useIsAuthenticated";
import { Link as RouterLink } from "react-router-dom";
import { useIsMobile } from "hooks/useIsMobile";
import { GradientText } from "auth/registration/types";
import { MobileAdsBenefits } from "auth/views/MobileAdsBenefits";

export function LandingPage() {
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();

  return (
    <Background>
      <LandingPageAppBar />
      {isMobile && <Toolbar sx={{ mb: 1 }} />}
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        justifyContent="center"
      >
        <Stack sx={{ maxWidth: "430px" }} spacing={isMobile ? 3 : 6}>
          <Typography variant={isMobile ? "h4" : "h3"} textAlign="left">
            <Typography variant="inherit" sx={GradientText}>
              Privacy-forward
            </Typography>{" "}
            advertising made simple
          </Typography>

          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            fontWeight={isMobile ? 500 : undefined}
          >
            Reach and convert new customers through premium advertising on the
            Brave browser and search engine.
          </Typography>

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              component={RouterLink}
              sx={{
                maxWidth: isMobile ? undefined : "165px",
                maxHeight: isMobile ? "40px" : "60px",
                padding: !isMobile ? "18px 24px 18px 24px" : 2,
                mb: 1,
              }}
              size={isMobile ? "medium" : "large"}
              to={isAuthenticated ? "/user/main" : "/register"}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Button>
            {!isMobile && !isAuthenticated && (
              <Typography variant="subtitle1">
                Already have an account?
                <Link
                  variant="subtitle1"
                  underline="none"
                  color="secondary"
                  component={RouterLink}
                  to="/auth/link"
                  sx={{ ml: 1 }}
                >
                  Log in
                </Link>
              </Typography>
            )}
          </Box>

          {isMobile && <MobileAdsBenefits />}
        </Stack>
        {!isMobile && <img src={goals} />}
      </Stack>
    </Background>
  );
}
