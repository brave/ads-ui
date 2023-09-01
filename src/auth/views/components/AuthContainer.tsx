import { Box } from "@mui/material";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { ReactNode } from "react";
import { PaddedCardContainer } from "components/Card/PaddedCardContainer";

interface Props {
  children?: ReactNode;
  belowCard?: ReactNode;
  aboveCard?: ReactNode;
}

export function AuthContainer({ children, belowCard, aboveCard }: Props) {
  return (
    <Background>
      <LandingPageAppBar />
      <Box
        display="flex"
        maxWidth="725px"
        minWidth={{ md: "700px" }}
        flexDirection="column"
      >
        {aboveCard}
        <PaddedCardContainer>{children}</PaddedCardContainer>
        {belowCard}
      </Box>
    </Background>
  );
}
