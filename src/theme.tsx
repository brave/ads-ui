import { createTheme } from "@mui/material";

export const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h1: {
      fontSize: "18px",
      fontWeight: 400,
    },
    h2: {
      fontSize: "14px",
      fontWeight: 600,
    },
  },
  palette: {
    primary: {
      main: "#F8532BCC",
    },
    secondary: {
      main: "#4C54D2",
    },
    background: {
      default: "#F1F3F5",
      paper: "white",
    },
    text: {
      primary: "#343546",
      secondary: "#A0A1B2",
    },
  },
});
