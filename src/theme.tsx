import { createTheme, responsiveFontSizes, SxProps } from "@mui/material";
import { findLocale } from "./i18n";

const appTheme = createTheme(
  {
    typography: {
      fontFamily: "Poppins",
      h1: {
        fontSize: "50px",
        maxWidth: "800px",
        fontWeight: 600,
        overflowWrap: "break-word",
      },
      h2: {
        fontSize: "18px",
        maxWidth: "624px",
        overflowWrap: "break-word",
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
            textTransform: "none",
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
      MuiContainer: {
        styleOverrides: {
          root: {
            marginLeft: 0,
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            mt: 1,
            mb: 1,
          },
        },
      },
    },
  },
  findLocale().gridTheme,
);

export const theme = responsiveFontSizes(appTheme);

export const modalStyles: SxProps = {
  position: "absolute",
  top: "50%",
  left: "50%",
  right: "auto",
  bottom: "auto",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  border: "2px solid #e2e2e2",
  boxShadow: 24,
  borderRadius: "16px",
  p: 4,
};
