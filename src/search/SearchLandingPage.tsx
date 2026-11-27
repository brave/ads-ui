import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { GetInTouch } from "@/components/Contact/GetInTouch";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { SearchTalkingPoints } from "@/search/SearchTalkingPoints";
import { Box, Stack, Toolbar, Typography } from "@mui/material";

export default function SearchLandingPage() {
  useTrackMatomoPageView({ documentTitle: "Search Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 5 }} />
      <Box display="flex" flexDirection="column" gap="75px" width="100%">
        <Box
          display="flex"
          flexDirection={{ xs: "column", md: "row" }}
          justifyContent="center"
          gap="50px"
          p={1}
        >
          <Stack direction="column" spacing={3} maxWidth={750} alignSelf="top">
            <Typography variant="h1" color="white">
              Get incremental traffic with paid ads on the world&rsquo;s fastest
              growing search engine.
            </Typography>
          </Stack>
        </Box>
        <SearchTalkingPoints />
        <GetInTouch heading="Get in touch" subject="Brave Search Ads inquiry" />
      </Box>
    </Background>
  );
}
