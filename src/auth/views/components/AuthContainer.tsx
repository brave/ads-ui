import { Box, Card, CardContent } from "@mui/material";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";
import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
  belowCard?: ReactNode;
  aboveCard?: ReactNode;
}

export function AuthContainer({ children, belowCard, aboveCard }: Props) {
  return (
    <Background>
      <LandingPageAppBar />
      <Box display="flex" width="725px" flexDirection="column">
        {aboveCard}
        <Card
          sx={{
            width: "100%",
            padding: "48px",
            gap: "32px",
          }}
        >
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {children}
          </CardContent>
        </Card>
        {belowCard}
      </Box>
    </Background>
  );
}
