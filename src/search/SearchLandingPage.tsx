import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { SearchTalkingPoints } from "@/search/SearchTalkingPoints";
import { Box, Button, Stack, Toolbar, Typography } from "@mui/material";

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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={{ xs: 5, md: 10 }}
        >
          <Typography variant="h3" color="white" gutterBottom>
            Get in touch
          </Typography>
          <Button
            variant="contained"
            href="mailto:searchads@brave.com"
            size="large"
            sx={{ pl: 4, pr: 4, pt: 1, pb: 1 }}
          >
            searchads@brave.com
          </Button>
        </Box>
      </Box>
    </Background>
  );
}
