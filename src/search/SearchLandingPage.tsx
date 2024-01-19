import { Box, Button, Link, Stack, Toolbar, Typography } from "@mui/material";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Background } from "components/Background/Background";
import searchPreview from "../../search-preview.svg";
import tswift from "../../tswift.svg";
import microwave from "../../microwave.svg";
import curtains from "../../curtains.svg";
import { useIsMobile } from "hooks/useIsMobile";
import { useEffect, useState } from "react";

export function SearchLandingPage() {
  const isMobile = useIsMobile();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 2 }} />
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Stack
          direction={{ md: "column", lg: "row" }}
          justifyContent="center"
          spacing={3}
          alignItems="center"
        >
          <Stack
            direction="column"
            spacing={3}
            maxWidth={800}
            justifyContent="center"
          >
            <Typography variant="h3">
              Tap into over <strong>9 billion</strong> annual Web searches
            </Typography>
            <Typography variant="subtitle1" fontSize="18px">
              Book a 30-minute meeting with a Brave Search specialist to discuss
              a free test campaign and see how Brave Ads can perform for your
              business.
            </Typography>
            <BookAMeetingButton />
            {isMobile && (
              <Box display="flex">
                <img src={searchPreview} width="100%" />
              </Box>
            )}
            <Stack
              direction={{ md: "column", lg: "row" }}
              gap={"20px"}
              mt={5}
              justifyContent="space-between"
            >
              <SearchTalkingPoint
                title="Incremental"
                description="Reach audiences who don’t use other search engines and block ads on most sites."
              />
              <SearchTalkingPoint
                title="As effective as Google"
                description="Brave Search Ads convert as well as, or better than Google Search ad clicks."
              />
              <SearchTalkingPoint
                title="Risk Free"
                description="Get a free one-month test to see how Search Ads perform for your brand."
              />
            </Stack>
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
        variant="contained"
        color="primary"
        size="medium"
        onClick={() =>
          window.open(
            "https://calendar.google.com/calendar/u/0/appointments/AcZssZ2sEAG3kPSlTKpGd48pYAa2zTd-QpI2L2ewxao=",
            "_blank",
            "noopener",
          )
        }
        sx={{ maxWidth: "200px", padding: 1.5 }}
      >
        Book a meeting
      </Button>
      <Typography>
        Or email{" "}
        <Link
          color="primary"
          variant="inherit"
          href="mailto:searchads@brave.com"
        >
          searchads@brave.com
        </Link>
      </Typography>
    </Stack>
  );
}

function SearchTalkingPoint(props: { title: string; description: string }) {
  return (
    <Stack spacing={1} maxWidth={500}>
      <Typography variant="h6">{props.title}</Typography>
      <Typography variant="body1">{props.description}</Typography>
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
    <Box display="flex" width="600px" overflow="hidden">
      <img
        src={images[(currentIndex + 2) % images.length]}
        style={{
          transform: "translateX(20%) translateY(-10%)",
          transition: "opacity 3s ease",
          height: "500px",
          width: "500px",
          opacity: 0.4,
        }}
      />
      <img
        src={images[(currentIndex + 1) % images.length]}
        style={{
          transform: "translateX(-90%)",
          transition: "opacity 3s ease",
          height: "500px",
          width: "500px",
          opacity: 0.6,
        }}
      />
      <img
        src={images[currentIndex]}
        style={{
          transform: "translateX(-200%) translateY(10%)",
          transition: "opacity 3s ease",
          height: "500px",
          width: "500px",
          opacity: 1,
        }}
      />
    </Box>
  );
}
