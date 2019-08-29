import styled from "styled-components";

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const Container = styled("div")`
  height: 100%;
`;
export const Content = styled("div")`
  display: flex;
`;
export const Main = styled("div")`
  padding: 24px;
  height: 100%;
  overflow: scroll;

  @media (max-width: ${Breakpoint.xs}) {
    width: 100%;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    width: 576px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    width: 768px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    width: 992px;
    margin-left: auto;
    margin-right: auto;
  }
  @media (min-width: ${Breakpoint.lg}) {
    width: 1200px;
    margin-left: auto;
    margin-right: auto;
  }
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
