import { PropsWithChildren } from "react";
import gradient from "assets/images/darker-gradient.svg";
import { Container } from "@mui/material";
import { useIsMobile } from "hooks/useIsMobile";

export function Background({ children }: PropsWithChildren) {
  const isMobile = useIsMobile();

  return (
    <Container
      maxWidth={isMobile ? "md" : false}
      sx={{
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${gradient})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        minHeight: "100%",
      }}
    >
      {children}
    </Container>
  );
}
