import logo from "@/assets/images/brave-icon-release-color.svg";
import { PrivacyPolicy } from "@/basic-attention-token/PrivacyPolicy";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { PaddedCardContainer } from "@/components/Card/PaddedCardContainer";
import { Box, Toolbar } from "@mui/material";
import Typography from "@mui/material/Typography";
import { PropsWithChildren } from "react";

export function RegistrationContainer(
  props: PropsWithChildren & { isSearch?: boolean },
) {
  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar />
      <Box p={1} minWidth={400}>
        <PaddedCardContainer>
          <img src={logo} height={50} />
          <Typography variant="h5" mt={3} mb={2}>
            Start your company profile
          </Typography>

          {props.children}

          <PrivacyPolicy isSearch={props.isSearch} />
        </PaddedCardContainer>
      </Box>
    </Background>
  );
}
