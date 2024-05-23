import { Background } from "@/components/Background/Background";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Box, Toolbar, Typography } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { GetStartedLandingPage } from "@/auth/views/GetStartedLandingPage";
import { BottomSwoop } from "@/components/Assets/BottomSwoop";
import { TopSwoop } from "@/components/Assets/TopSwoop";
import { WhatIsBraveAds } from "@/auth/views/components/WhatIsBraveAds";
import { WhyUseBraveAds } from "@/auth/views/components/WhyUseBraveAds";
import { BasicAttentionTokenLandingPage } from "@/basic-attention-token/BasicAttentionTokenLandingPage";
import { Trans } from "@lingui/macro";

export function LandingPage() {
  useTrackMatomoPageView({ documentTitle: "Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ width: "100%", bgcolor: "black" }} />
      <Toolbar sx={{ width: "100%", bgcolor: "black" }} />
      <Box height="100vh" width="100%">
        <Box display="flex" justifyContent="center" bgcolor="black">
          <GetStartedLandingPage />
        </Box>
        <BottomSwoop />
        <WhatIsBraveAds />
      </Box>
      <Box height="100vh" width="100%" mb={65}>
        <TopSwoop />
        <Box display="flex" bgcolor="black" justifyContent="center">
          <WhyUseBraveAds />
        </Box>
        <BottomSwoop />
        <BasicAttentionTokenLandingPage />
      </Box>
      <Box height="20vh" width="100%">
        <TopSwoop />
        <Box
          display="flex"
          bgcolor="black"
          justifyContent="center"
          height="200px"
        >
          <Typography variant="h3" color="white" mt={5}>
            <Trans>SOMETHING ABOUT SEARCH GOES HERE</Trans>
          </Typography>
        </Box>
      </Box>
      {/*<SearchLandingPage />*/}
    </Background>
  );
}
