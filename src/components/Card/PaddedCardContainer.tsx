import { Card, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";

export function PaddedCardContainer({ children }: PropsWithChildren) {
  return (
    <Card
      sx={{
        width: "100%",
        padding: "38px",
        gap: "22px",
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
