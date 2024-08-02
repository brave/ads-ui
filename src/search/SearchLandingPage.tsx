import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Background } from "@/components/Background/Background";
import { Trans } from "@lingui/macro";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { SearchRegister } from "@/auth/registration/SearchRegister";
import braveSearch from "@/assets/videos/setting_up_brave_search_ads.mp4";
import { SearchTalkingPoints } from "@/search/SearchTalkingPoints";

export function SearchLandingPage() {
  useTrackMatomoPageView({ documentTitle: "Search Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 5 }} />
      <Box
        display="flex"
        flexDirection="column"
        gap={{ xs: "75px", md: "150px" }}
      >
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          gap="50px"
          p={1}
        >
          <Stack direction="column" spacing={3} maxWidth={650} alignSelf="top">
            <Typography variant="h1" color="white">
              <Trans>
                Get incremental traffic with paid ads on the world's fastest
                growing search engine.
              </Trans>
            </Typography>
            <Typography
              variant="subtitle1"
              fontSize="18px"
              color="white"
              maxWidth={500}
            >
              <Trans>
                Check if your brand is eligible for a{" "}
                <strong>free trial</strong> of Brave Search Ads.{" "}
                <Link
                  color="secondary"
                  sx={{ cursor: "pointer" }}
                  onClick={() => {
                    window.open(
                      "https://search.brave.com/",
                      "_blank",
                      "noopener",
                    );
                  }}
                >
                  Try Brave Search
                </Link>{" "}
                to see why our users choose us over Google and Bing.
              </Trans>
            </Typography>
          </Stack>
          <SearchRegister />
        </Box>
        <Box
          display="flex"
          flexDirection={{ xs: "column-reverse", md: "row" }}
          justifyContent="center"
          gap="50px"
          alignItems="center"
        >
          <video
            src={braveSearch}
            controls
            width="100%"
            style={{ borderRadius: "16px", maxWidth: "700px" }}
          />
          <Stack
            direction="column"
            spacing={3}
            maxWidth={{ xs: 400, md: 600 }}
            alignSelf="top"
          >
            <Typography variant="h1" color="white" maxWidth={500}>
              <Trans>Set up a trial campaign in minutes.</Trans>
            </Typography>
            <Typography variant="subtitle1" fontSize="18px" color="white">
              <Trans>
                Brave Search Ads are built to be easy to manage. Once enabled,
                brands will benefit from a passive increase in traffic without
                the need to constantly monitor and tweak campaigns.
              </Trans>
            </Typography>
          </Stack>
        </Box>
        <SearchTalkingPoints />
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ xs: 5, md: 20 }}
        >
          <Typography variant="h1" color="white">
            <Trans>Have specific questions?</Trans>
          </Typography>
          <Typography variant="h3" color="white" gutterBottom>
            <Trans>Get in touch.</Trans>
          </Typography>
          <Button
            variant="contained"
            href="mailto:searchads@brave.com"
            size="large"
            sx={{ pl: 4, pr: 4, pt: 1, pb: 1 }}
          >
            <Trans>searchads@brave.com</Trans>
          </Button>
        </Box>
      </Box>
    </Background>
  );
}
