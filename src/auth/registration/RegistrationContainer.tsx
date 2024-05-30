import { PropsWithChildren } from "react";
import { PaddedCardContainer } from "@/components/Card/PaddedCardContainer";
import logo from "@/assets/images/brave-icon-release-color.svg";
import Typography from "@mui/material/Typography";
import { Trans } from "@lingui/macro";
import { PrivacyPolicy } from "@/basic-attention-token/PrivacyPolicy";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { Box, Toolbar } from "@mui/material";

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
            <Trans>Start your company profile</Trans>
          </Typography>

          {props.children}

          <PrivacyPolicy isSearch={props.isSearch} />
        </PaddedCardContainer>
      </Box>
    </Background>
  );
}
