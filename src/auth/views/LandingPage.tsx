import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import React from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import goals from "../../../images.svg";

const GradientText = {
  backgroundImage:
    "linear-gradient(96.46deg, #FF2869 -4.13%, #930BFE 82.88%), linear-gradient(0deg, #111317, #111317);",
  backgroundClip: "text",
  color: "transparent",
};

export function LandingPage() {
  return (
    <Background>
      <LandingPageAppBar />
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        justifyContent="center"
      >
        <Stack sx={{ maxWidth: "380px" }} spacing={6}>
          <Typography variant="h3">
            <Typography variant="h3" sx={GradientText}>
              Reaching
            </Typography>{" "}
            your customer made easy
          </Typography>

          <Typography variant="h6">
            Grow your business with premium, privacy-first advertising on the
            Brave browser.
          </Typography>

          <Box>
            <Button
              variant="contained"
              sx={{
                width: "Hug (165px)",
                height: "Fixed (60px)",
                padding: "18px 24px 18px 24px",
              }}
              size="large"
              href="/register"
            >
              Get Started
            </Button>
          </Box>
        </Stack>
        <img src={goals} />
      </Stack>
    </Background>
  );
}
