import { PropsWithChildren } from "react";
import { PaddedCardContainer } from "@/components/Card/PaddedCardContainer";
import logo from "@/assets/images/brave-icon-release-color.svg";
import Typography from "@mui/material/Typography";
import { Trans } from "@lingui/macro";
import { PrivacyPolicy } from "@/basic-attention-token/PrivacyPolicy";
import { useIsMobile } from "@/hooks/useIsMobile";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { Background } from "@/components/Background/Background";
import { Toolbar } from "@mui/material";

export function RegistrationContainer(
  props: PropsWithChildren & { isSearch?: boolean },
) {
  const isMobile = useIsMobile();

  return (
    <Background>
      <LandingPageAppBar />
      <Toolbar />
      <PaddedCardContainer>
        <img src={logo} height={50} />
        {!isMobile && <div style={{ width: 400 }} />}
        <Typography variant="h5" mt={3} mb={2}>
          <Trans>Start your company profile</Trans>
        </Typography>

        {props.children}

        <PrivacyPolicy isSearch={props.isSearch} />
      </PaddedCardContainer>
    </Background>
  );
}
