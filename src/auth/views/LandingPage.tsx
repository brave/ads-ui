import { Background } from "@/components/Background/Background";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Box, Toolbar } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { GetStartedLandingPage } from "@/auth/views/GetStartedLandingPage";
import { BottomSwoop } from "@/components/Assets/BottomSwoop";
import { TopSwoop } from "@/components/Assets/TopSwoop";
import { WhyUseBraveAds } from "@/auth/views/components/WhyUseBraveAds";
import { WhatIsBrave } from "@/auth/views/components/WhatIsBrave";
import { WhatIsBraveAds } from "@/auth/views/components/WhatIsBraveAds";
import { Inquiries } from "@/auth/views/components/Inquiries";
import { FooterCTA } from "@/auth/views/components/FooterCTA";

export function LandingPage() {
  useTrackMatomoPageView({ documentTitle: "Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar />
      <Toolbar />
      <Box width="100%">
        <Box display="flex" justifyContent="center" p={1}>
          <GetStartedLandingPage />
        </Box>
        <TopSwoop />
        <Box display="flex" justifyContent="center" bgcolor="white" p={1}>
          <WhyUseBraveAds />
        </Box>
      </Box>
      <Box height="100%" width="100%">
        <BottomSwoop />
        <Box bgcolor="black" p={5}>
          <WhatIsBrave />
          <WhatIsBraveAds />
          <Inquiries />
        </Box>
        <TopSwoop />
        <Box bgcolor="white" pb={5} pt={1}>
          <FooterCTA />
        </Box>
      </Box>
    </Background>
  );
}
