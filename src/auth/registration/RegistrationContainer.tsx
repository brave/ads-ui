import { PropsWithChildren } from "react";
import { PaddedCardContainer } from "components/Card/PaddedCardContainer";
import logo from "../../../brave-icon-release-color.svg";
import Typography from "@mui/material/Typography";
import { Trans } from "@lingui/macro";
import { PrivacyPolicy } from "basic-attention-token/PrivacyPolicy";
import { useIsMobile } from "hooks/useIsMobile";
import { Box } from "@mui/material";

export function RegistrationContainer(props: PropsWithChildren) {
  const isMobile = useIsMobile();

  return (
    <Box display="flex" maxWidth="800px" flexDirection="column" mb={3}>
      <PaddedCardContainer>
        <img src={logo} height={50} />
        {!isMobile && <div style={{ width: 600 }} />}
        <Typography variant="h5" mt={3} mb={2}>
          <Trans>Start your company profile</Trans>
        </Typography>

        {props.children}

        <PrivacyPolicy />
      </PaddedCardContainer>
    </Box>
  );
}
