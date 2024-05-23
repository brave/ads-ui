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
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
        bgcolor: "#fff",
      }}
    >
      {children}
    </Container>
  );
}
