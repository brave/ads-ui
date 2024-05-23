import { useTrackMatomoEvent } from "@/hooks/useTrackWithMatomo";
import { Box, Button, Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Trans } from "@lingui/macro";
import basicattentiontoken from "@/assets/images/basic-attention-token.svg";

export function BasicAttentionTokenLandingPage() {
  return (
    <Box display="flex" justifyContent="center" mt={5}>
      <Stack maxWidth={1000} spacing={3}>
        <Box alignSelf="center">
          <img src={basicattentiontoken} width="300px" />
        </Box>
        <Typography variant="h4" textAlign="center" fontWeight={400}>
          <Trans>
            Interested? Pay with BAT to get <strong>50% off</strong> your first
            campaign.
          </Trans>
        </Typography>

        <Typography variant="subtitle1" textAlign="center">
          <Trans>
            Brave is place where early adopters thrive. We’re celebrating our
            crypto roots by offering new and returning customers half off their
            first campaign when they check-out with BAT<strong>*</strong>.
          </Trans>
        </Typography>

        <Typography variant="caption" textAlign="center">
          <Trans>
            *Limited time only. Available to new advertisers, and those who ran
            campaigns before September 30, 2023.
          </Trans>
        </Typography>

        <LaunchCampaignButton />
      </Stack>
    </Box>
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
          width: "180px",
          maxHeight: { xs: "40px", md: "60px" },
          mb: 1,
          fontSize: "18px",
        }}
      >
        <Trans>Sign up</Trans>
      </Button>
      <Link
        color="secondary"
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
