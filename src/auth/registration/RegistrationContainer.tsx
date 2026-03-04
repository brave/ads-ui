import logo from "@/assets/images/brave-icon-release-color.svg";
import { PrivacyPolicy } from "@/basic-attention-token/PrivacyPolicy";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { PaddedCardContainer } from "@/components/Card/PaddedCardContainer";
import { Box, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";
import { Link as RouterLink } from "react-router-dom";

export function RegistrationContainer(props: PropsWithChildren) {
  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar />
      <Box p={1} minWidth={400}>
        <PaddedCardContainer>
          <img src={logo} height={50} />
          <Typography variant="h5" mt={3} mb={1}>
            Register for Browser Push Ads
          </Typography>
          <Typography variant="body2" mb={2}>
            Looking to advertise on Brave Search?{" "}
            <RouterLink to="/contact" style={{ textDecoration: "none" }}>
              Contact sales
            </RouterLink>
          </Typography>

          {props.children}

          <PrivacyPolicy isSearch={false} />
        </PaddedCardContainer>
      </Box>
    </Background>
  );
}
