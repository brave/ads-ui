import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { Background } from "@/components/Background/Background";
import searchPreview from "@/assets/images/search-preview.png";
import tswift from "@/assets/images/tswift.png";
import microwave from "@/assets/images/microwave.png";
import curtains from "@/assets/images/curtains.png";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useEffect, useState } from "react";
import { Trans } from "@lingui/macro";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { SearchTalkingPoints } from "@/search/SearchTalkingPoints";
import { Link as RouterLink } from "react-router-dom";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";

export function SearchLandingPage() {
  useTrackMatomoPageView({ documentTitle: "Search Landing Page" });
  const isMobile = useIsMobile();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" justifyContent="center" p={1}>
        <Stack
          direction={{ md: "column", lg: "row" }}
          spacing={1}
          alignItems="center"
        >
          <Stack
            direction="column"
            spacing={3}
            maxWidth={750}
            justifyContent="center"
          >
            <Typography variant="h3" color="white">
              <Trans>
                Tap into more than <strong>9 billion</strong> annual Web
                searches
              </Trans>
            </Typography>
            <Typography variant="subtitle1" fontSize="18px" color="white">
              <Trans>
                Brave Search is the fastest growing independent search engine
                since Bing, with more than 9 billion searches each year (and
                growing). It’s the default search engine for Brave’s tens of
                millions of worldwide users, and available in any other browser
                at{" "}
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
                  search.brave.com
                </Link>{" "}
              </Trans>
            </Typography>
            <Typography variant="subtitle1" fontSize="18px" color="white">
              <Trans>
                Brave Search Ads are privacy-preserving, text-based ads that
                appear at the top of a user’s search results page (SERP). Want
                to redefine your SEM program, and diversify from Big Tech? Get
                the first-mover advantage and start targeting your brand’s most
                important keywords today.
              </Trans>
            </Typography>
            <BookAMeetingButton />
            {isMobile && (
              <Box display="flex" alignSelf="center">
                <img src={searchPreview} width="100%" height={400} />
              </Box>
            )}
            <SearchTalkingPoints />
          </Stack>
          {!isMobile && <SearchImageCarousel />}
        </Stack>
      </Box>
    </Background>
  );
}

function BookAMeetingButton() {
  return (
    <Stack direction="column" spacing={1}>
      <Button
        component={RouterLink}
        to="register/search"
        variant="contained"
        color="primary"
        size="medium"
        sx={{ maxWidth: "200px", padding: 1.5 }}
      >
        <Trans>Check eligibility</Trans>
      </Button>
      <Typography color="white">
        <Trans>
          Or email{" "}
          <Link
            color="secondary"
            variant="inherit"
            href="mailto:searchads@brave.com"
          >
            searchads@brave.com
          </Link>
        </Trans>
      </Typography>
    </Stack>
  );
}

function SearchImageCarousel() {
  const images = [tswift, microwave, curtains];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 10_000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box display="flex" width="550px" p={{ sm: 5 }}>
      <img
        src={images[(currentIndex + 2) % images.length]}
        style={{
          transform: "translateX(10%) translateY(-10%)",
          transition: "opacity 3s ease",
          height: "450px",
          width: "550px",
          opacity: 0.4,
        }}
      />
      <img
        src={images[(currentIndex + 1) % images.length]}
        style={{
          transform: "translateX(-95%)",
          height: "450px",
          width: "550px",
          opacity: 0.6,
        }}
      />
      <img
        src={images[currentIndex]}
        style={{
          transform: "translateX(-200%) translateY(10%)",
          transition: "opacity 3s ease",
          height: "450px",
          width: "550px",
          opacity: 1,
        }}
      />
    </Box>
  );
}
