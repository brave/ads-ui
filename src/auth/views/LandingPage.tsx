import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import goals from "../../../images.svg";
import { useIsAuthenticated } from "auth/hooks/queries/useIsAuthenticated";
import { Link as RouterLink } from "react-router-dom";
import { useIsMobile } from "hooks/useIsMobile";
import { MobileAdsBenefits } from "auth/views/MobileAdsBenefits";

const GradientText = {
  backgroundImage:
    "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
  backgroundClip: "text",
  color: "transparent",
};

export function LandingPage() {
  const isAuthenticated = useIsAuthenticated();
  const isMobile = useIsMobile();

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
        <Stack sx={{ maxWidth: "430px" }} spacing={{ xs: 3, md: 6 }}>
          <Typography variant="h3" textAlign="left">
            <Typography variant="inherit" sx={GradientText}>
              Privacy-forward
            </Typography>{" "}
            advertising made simple
          </Typography>

          <Typography variant="h6" fontWeight={{ xs: 500, md: undefined }}>
            Reach and convert new customers through premium advertising on the
            Brave browser and search engine.
          </Typography>

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              component={RouterLink}
              sx={{
                maxWidth: { xs: undefined, md: "165px" },
                maxHeight: { xs: "40px", md: "60px" },
                padding: { xs: 2, md: "18px 24px 18px 24px" },
                mb: 1,
              }}
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
