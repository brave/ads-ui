import { Box, Card, CardContent, Container } from "@mui/material";
import React from "react";

interface Props {
  height?: string;
  width?: string;
  children?: React.ReactNode;
}

export function AuthContainer({ height, width, children }: Props) {
  return (
    <Container
      maxWidth={false}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "radial-gradient(ellipse 100% 100% at 0% 0%,rgb(57, 45, 209, 0.8) 0%,rgb(255, 67, 67, 0.8) 100%)",
        height: "100%",
      }}
    >
      <Box height={height ?? "520px"} width={width ?? "725px"}>
        <Card
          sx={{
            width: "100%",
            height: "100%",
            padding: "28px",
            borderRadius: "6px",
            boxShadow: "rgba(99, 105, 110, 0.18) 0px 1px 12px 0px",
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
      </Box>
    </Container>
  );
}
