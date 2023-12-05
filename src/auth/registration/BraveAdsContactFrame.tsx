import { Box, Stack, Toolbar, Typography } from "@mui/material";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { Background } from "components/Background/Background";

export function BraveAdsContactFrame() {
  return (
    <Background>
      <LandingPageAppBar />
      <Box
        display="flex"
        flexDirection="column"
        position="absolute"
        height="100%"
        width="100%"
      >
        <Toolbar />
        <Stack direction="row" justifyContent="center">
          <Typography textAlign="center" variant="h4" sx={{ mb: 3, mt: 3 }}>
            Get in touch with our team
          </Typography>
        </Stack>
        <iframe
          style={{ display: "block", top: "0", left: "0" }}
          frameBorder={0}
          height="100%"
          sandbox="allow-scripts allow-forms allow-same-origin allow-popups allow-popups-to-escape-sandbox"
          allow="accelerometer 'none'; ambient-light-sensor 'none'; camera 'none'; display-capture 'none'; document-domain 'none'; fullscreen 'none'; geolocation 'none'; gyroscope 'none'; magnetometer 'none'; microphone 'none'; midi 'none'; payment 'none'; usb 'none'; vibrate 'none'; vr 'none'; webauthn 'none'"
          src="https://contact.ads.brave.com"
        />
      </Box>
    </Background>
  );
}
