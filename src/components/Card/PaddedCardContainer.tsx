import { Card, CardContent } from "@mui/material";
import { useIsMobile } from "hooks/useIsMobile";
import { PropsWithChildren } from "react";

export function PaddedCardContainer({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();
  return (
    <Card
      sx={{
        width: "100%",
        padding: isMobile ? "2px" : "38px",
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
