import { Card, CardContent } from "@mui/material";
import React, { PropsWithChildren } from "react";

export function PaddedCardContainer({ children }: PropsWithChildren) {
  return (
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
  );
}
