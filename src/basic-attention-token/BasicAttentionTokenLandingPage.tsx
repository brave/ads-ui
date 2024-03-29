import {
  useTrackMatomoEvent,
  useTrackMatomoPageView,
} from "hooks/useTrackWithMatomo";
import { useIsMobile } from "hooks/useIsMobile";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import notification from "../../newsfeed.png";
import mobileAd from "../../news-mobile.png";
import bat from "../../basic-attention-token.svg";
import { Trans } from "@lingui/macro";

export function BasicAttentionTokenLandingPage() {
  useTrackMatomoPageView({ documentTitle: "BAT Landing Page" });
  const isMobile = useIsMobile();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Stack
          direction={{ md: "column", lg: "row" }}
          spacing={3}
          justifyContent="center"
        >
          <Stack
            direction="column"
            spacing={3}
            maxWidth={750}
            justifyContent="center"
          >
            <Typography variant="h3">
              <Trans>
                Pay with BAT to get <strong>50% off</strong> your first campaign
              </Trans>
            </Typography>
            <Typography variant="subtitle1" fontSize="18px">
              <Trans>
                Brave is place where early adopters thrive. We’re celebrating
                our crypto roots by offering new and returning customers half
                off their first campaign when they check-out with BAT.
              </Trans>
            </Typography>
            <Typography variant="body2">
              <Trans>
                Limited time only. Available to new advertisers, and those who
                ran campaigns before September 30, 2023.
              </Trans>
            </Typography>

            {isMobile && (
              <Box display="flex" alignSelf="center" flexDirection="column">
                <img src={mobileAd} width="100%" height={350} />
                <img src={bat} />
              </Box>
            )}

            <LaunchCampaignButton />
          </Stack>
          {!isMobile && <AdImageContainer />}
        </Stack>
      </Box>
    </Background>
  );
}

function LaunchCampaignButton() {
  const { trackMatomoEvent } = useTrackMatomoEvent();

  return (
    <Stack direction="row" spacing={5} alignItems="center">
      <Button
        variant="contained"
        color="primary"
        size="medium"
        component={RouterLink}
        to="/register?pos=personal"
        onClick={() =>
          trackMatomoEvent("basic-attention-token", "launch-campaign")
        }
        sx={{ padding: 2 }}
      >
        <Trans>Launch a Campaign</Trans>
      </Button>
      <Link
        color="primary"
        sx={{ cursor: "pointer" }}
        onClick={() => {
          trackMatomoEvent("basic-attention-token", "learn-about-bat");
          window.open("https://basicattentiontoken.org/", "_blank", "noopener");
        }}
      >
        <Trans>Learn more about BAT</Trans>
      </Link>
    </Stack>
  );
}

function AdImageContainer() {
  return (
    <Box
      display="flex"
      alignSelf="center"
      flexDirection="column"
      height={600}
      overflow="hidden"
    >
      <img src={notification} width="100%" height={600} />
      <img
        src={bat}
        width={400}
        style={{
          transform: "translateX(40%) translateY(-90%)",
        }}
      />
    </Box>
  );
}
