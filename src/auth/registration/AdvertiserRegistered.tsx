import { Link, Stack, Typography } from "@mui/material";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { AuthContainer } from "@/auth/views/components/AuthContainer";
import logo from "@/assets/images/brave-icon-release-color.svg";

export function AdvertiserRegistered() {
  useTrackMatomoPageView({ documentTitle: "Advertiser Registration Complete" });

  return (
    <AuthContainer>
      <Stack direction="column" alignItems="center" spacing={3}>
        <img src={logo} height={60} />
        <Typography variant="h4" sx={{ mb: 3 }}>
          Success! Check your email.
        </Typography>
        <Typography variant="h5" sx={{ mb: 3 }} textAlign="center">
          You will soon receive an email with the next steps of registration.
          While you wait, we recommend you check out our help center to get
          helpful information for getting started with Brave Ads.
        </Typography>
        <Link
          href="https://ads-help.brave.com"
          variant="h5"
          target="_blank"
          underline="none"
        >
          Visit Help Center
        </Link>
      </Stack>
    </AuthContainer>
  );
}
