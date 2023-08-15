import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import goals from "../../../images.svg";
import { useIsAuthenticated } from "auth/hooks/queries/useIsAuthenticated";
import { Link as RouterLink } from "react-router-dom";

const GradientText = {
  backgroundImage:
    "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
  backgroundClip: "text",
  color: "transparent",
};

export function LandingPage() {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Background>
      <LandingPageAppBar />
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        justifyContent="center"
      >
        <Stack sx={{ maxWidth: "430px" }} spacing={6}>
          <Typography variant="h3">
            <Typography variant="h3" sx={GradientText}>
              Privacy-forward
            </Typography>{" "}
            advertising made simple
          </Typography>

          <Typography variant="h6">
            Reach and convert new customers through premium advertising on the
            Brave browser and search engine.
          </Typography>

          <Box display="flex" flexDirection="column">
            <Button
              variant="contained"
              component={RouterLink}
              sx={{
                maxWidth: "165px",
                height: "60px",
                padding: "18px 24px 18px 24px",
                mb: 1,
              }}
              size="large"
              to={isAuthenticated ? "/user/main" : "/register"}
            >
              {isAuthenticated ? "Dashboard" : "Get Started"}
            </Button>
            {!isAuthenticated && (
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
        </Stack>
        <img src={goals} />
      </Stack>
    </Background>
  );
}
