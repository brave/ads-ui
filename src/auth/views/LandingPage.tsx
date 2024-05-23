import { Background } from "@/components/Background/Background";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Box, Toolbar } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { GetStartedLandingPage } from "@/auth/views/GetStartedLandingPage";
import { BottomSwoop } from "@/components/Assets/BottomSwoop";
import { TopSwoop } from "@/components/Assets/TopSwoop";
import { WhyUseBraveAds } from "@/auth/views/components/WhyUseBraveAds";
import { BasicAttentionTokenLandingPage } from "@/basic-attention-token/BasicAttentionTokenLandingPage";
import { WhatIsBrave } from "@/auth/views/components/WhatIsBrave";
import { WhatIsBraveAds } from "@/auth/views/components/WhatIsBraveAds";

export function LandingPage() {
  useTrackMatomoPageView({ documentTitle: "Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar />
      <Toolbar />
      <Box width="100%">
        <Box display="flex" justifyContent="center">
          <GetStartedLandingPage />
        </Box>
        <TopSwoop />
        <Box bgcolor="white" p={5}>
          <WhatIsBrave />
          <WhatIsBraveAds />
        </Box>
      </Box>
      <Box height="100%" width="100%">
        <BottomSwoop />
        <Box display="flex" justifyContent="center">
          <WhyUseBraveAds />
        </Box>
        <TopSwoop />
        <Box bgcolor="white" pt={1} pb={4}>
          <BasicAttentionTokenLandingPage />
        </Box>
      </Box>
    </Background>
  );
}
