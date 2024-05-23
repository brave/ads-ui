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
        background:
          "linear-gradient(-45deg, rgb(42, 31, 173) 0%, rgb(169, 27, 120) 100%) 0% 0% / 150% 150%",
        animation: "5s ease 0s infinite normal none running Gradient",
      }}
    >
      {children}
    </Container>
  );
}
