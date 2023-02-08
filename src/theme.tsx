import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "18px",
      fontWeight: 400,
    },
  },
  palette: {
    primary: {
      main: "#F8532BCC",
    },
    secondary: {
      main: "#4C54D2",
    },
  },
});
