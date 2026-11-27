import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { GetInTouch } from "@/components/Contact/GetInTouch";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { Toolbar } from "@mui/material";

export function BraveAdsContactPage() {
  useTrackMatomoPageView({ documentTitle: "Managed Services Form" });

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar sx={{ mb: 5 }} />
      <GetInTouch
        heading="Get in touch with our team"
        subject="Brave Ads inquiry"
      />
    </Background>
  );
}
