import { Box } from "@mui/material";
import { Background } from "@/components/Background/Background";
import { LandingPageAppBar } from "@/components/AppBar/LandingPageAppBar";
import { ReactNode } from "react";
import { PaddedCardContainer } from "@/components/Card/PaddedCardContainer";
import { UserRedirect } from "@/auth/components/UserRedirect";

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
        maxWidth="750px"
        minWidth={{ xs: "400px", sm: "700px" }}
        flexDirection="column"
        p={1}
      >
        {aboveCard}
        <PaddedCardContainer>{children}</PaddedCardContainer>
        {belowCard}
      </Box>
      <UserRedirect />
    </Background>
  );
}
