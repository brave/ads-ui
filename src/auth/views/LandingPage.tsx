import { FooterCTA } from "@/auth/views/components/FooterCTA";
import { Inquiries } from "@/auth/views/components/Inquiries";
import { WhatIsBrave } from "@/auth/views/components/WhatIsBrave";
import { WhatIsBraveAds } from "@/auth/views/components/WhatIsBraveAds";
import { WhyUseBraveAds } from "@/auth/views/components/WhyUseBraveAds";
import { GetStartedLandingPage } from "@/auth/views/GetStartedLandingPage";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { BottomSwoop } from "@/components/Assets/BottomSwoop";
import { TopSwoop } from "@/components/Assets/TopSwoop";
import { Background } from "@/components/Background/Background";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { Box, Toolbar } from "@mui/material";

export function LandingPage() {
  useTrackMatomoPageView({ documentTitle: "Landing Page" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 8 }} />
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
