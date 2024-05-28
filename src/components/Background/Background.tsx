import { PropsWithChildren } from "react";
import { Container } from "@mui/material";
import { useIsMobile } from "@/hooks/useIsMobile";

export function Background({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  return (
    <Container
      maxWidth={isMobile ? "md" : false}
      disableGutters
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        animationTimeline: "auto",
        animationRangeStart: "normal",
        animationRangeEnd: "normal",
        background: "#000",
      }}
    >
      {children}
    </Container>
  );
}
