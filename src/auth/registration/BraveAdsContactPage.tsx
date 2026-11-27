import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { Box, Button, Toolbar, Typography } from "@mui/material";

export function BraveAdsContactPage() {
  useTrackMatomoPageView({ documentTitle: "Managed Services Form" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 5 }} />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        width="100%"
        mb={{ xs: 5, md: 10 }}
      >
        <Typography variant="h3" color="white" gutterBottom>
          Get in touch with our team
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
    </Background>
  );
}
