import { PropsWithChildren } from "react";
import gradient from "../../../background.svg";
import { Container } from "@mui/material";

export function Background({ children }: PropsWithChildren) {
  return (
    <Container
      maxWidth={false}
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
