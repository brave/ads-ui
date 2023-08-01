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
      main: "#423eee",
    },
    secondary: {
      main: "#fe5907",
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
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "1000px",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "rgba(99, 105, 110, 0.18) 0px 1px 12px 0px",
        },
      },
    },
  },
});
