import { Box, Card, CardContent, Container } from "@mui/material";
import React from "react";
import { Background } from "components/Background/Background";
import { LandingPageAppBar } from "components/AppBar/LandingPageAppBar";

interface Props {
  children?: React.ReactNode;
  belowCard?: React.ReactNode;
  aboveCard?: React.ReactNode;
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
