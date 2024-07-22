import {
  useTrackMatomoEvent,
  useTrackMatomoPageView,
} from "@/hooks/useTrackWithMatomo";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";
import basicattentiontoken from "@/assets/images/basic-attention-token.svg";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { BottomSwoop } from "@/components/Assets/BottomSwoop";
import { TopSwoop } from "@/components/Assets/TopSwoop";

export function BasicAttentionTokenLandingPage() {
  useTrackMatomoPageView({
    documentTitle: "Basic Attention Token Landing Page",
  });
  return (
    <Background>
      <LandingPageAppBar />

      <Box mt={2} />
      <TopSwoop />
      <Box display="flex" justifyContent="center" bgcolor="white" width="100%">
        <Stack maxWidth={1000} spacing={3} mb={1}>
          <Box alignSelf="center">
            <Box
              component="img"
              src={basicattentiontoken}
              width={{ xs: "300px", md: "500px" }}
            />
          </Box>
          <Typography variant="h4" textAlign="center" fontWeight={400}>
            <Trans>
              Pay with BAT to get <strong>50% off</strong> your first
              self-managed campaign.
            </Trans>
          </Typography>

          <Typography variant="subtitle1" textAlign="center">
            <Trans>
              Brave is where early adopters thrive. We’re celebrating our crypto
              roots by offering new and returning Brave Ads customers half off
              their first self-managed campaign if they buy with BAT
              <strong>*</strong>
            </Trans>
          </Typography>

          <Typography variant="caption" textAlign="center">
            <Trans>
              *Limited time only. Available to new advertisers, and those who
              ran campaigns prior to September 30, 2023. Eligible for Push
              Notification and Newsfeed ads.
            </Trans>
          </Typography>

          <LaunchCampaignButton />
        </Stack>
      </Box>
      <BottomSwoop />

      <WhatIsBAT />
    </Background>
  );
}

function LaunchCampaignButton() {
  const { trackMatomoEvent } = useTrackMatomoEvent();

  return (
    <Stack direction="row" spacing={5} alignSelf="center" alignItems="center">
      <Button
        variant="contained"
        color="primary"
        size="medium"
        component={RouterLink}
        to="/register/browser"
        onClick={() =>
          trackMatomoEvent("basic-attention-token", "launch-campaign")
        }
        sx={{
          width: "250px",
          maxHeight: { xs: "40px", md: "60px" },
          mb: 1,
          fontSize: "16px",
        }}
      >
        <Trans>Start a campaign with BAT</Trans>
      </Button>
    </Stack>
  );
}

function WhatIsBAT() {
  const { trackMatomoEvent } = useTrackMatomoEvent();

  return (
    <Box display="flex" justifyContent="center" pb={5}>
      <Stack maxWidth={1000} spacing={3}>
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight={600}
          color="white"
        >
          <Trans>What’s BAT?</Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center" color="white">
          <Trans>
            The{" "}
            <Link
              color="secondary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                trackMatomoEvent("basic-attention-token", "learn-about-bat");
                window.open(
                  "https://basicattentiontoken.org/",
                  "_blank",
                  "noopener",
                );
              }}
            >
              Basic Attention Token (BAT)
            </Link>{" "}
            is Brave’s native crypto token. Brave Browser users who opt into{" "}
            <Link
              color="secondary"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                trackMatomoEvent("brave-rewards", "learn-about-brave-rewards");
                window.open(
                  "https://brave.com/brave-rewards/",
                  "_blank",
                  "noopener",
                );
              }}
            >
              Brave Rewards
            </Link>{" "}
            can earn BAT just for opting into viewing ads from the Brave Ads
            network. Earners can hold BAT like any other crypto asset, trade it,
            cash it in, or even donate it to their favorite creators.
          </Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center" color="white">
          <Trans>
            BAT holders can now also cash in their tokens to advertise their
            companies or products on the Brave Ads network.
          </Trans>
        </Typography>
      </Stack>
    </Box>
  );
}
