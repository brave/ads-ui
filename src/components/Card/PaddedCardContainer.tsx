import { Card, CardContent } from "@mui/material";
import { PropsWithChildren } from "react";

export function PaddedCardContainer({ children }: PropsWithChildren) {
  return (
    <Card
      sx={{
        width: "100%",
        padding: { xs: "3px", md: "30px" },
        maxWidth: 725,
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
