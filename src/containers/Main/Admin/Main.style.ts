import styled from "styled-components";
export const Container = styled("div")`
  height: 100%;
`;
export const Content = styled("div")`
  display: flex;
  height: 100%;
  overflow: hidden;
`;

const drawerWidth = 240;

export const styles = (theme: any) =>
  ({
    content: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    },
    docked: {
      height: "100%"
    },
    drawerPaper: {
      height: "100%",
      position: "relative",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.enteringScreen,
        easing: theme.transitions.easing.sharp
      }),
      width: drawerWidth
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      }),
      width: theme.spacing.unit * 7,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing.unit * 9
      }
    },
    link: {
      textDecoration: "none"
    },
    root: {
      display: "flex",
      flexGrow: 1,
      height: "100%",
      overflow: "hidden",
      position: "relative",
      zIndex: 1
    },
    toolbar: {
      alignItems: "center",
      display: "flex",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar
    }
  } as any);
