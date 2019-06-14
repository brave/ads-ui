const drawerWidth = 240;

import styled from "styled-components";
import BraveLogo from "../../../assets/images/brave-logotype-full-color.png";

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const Container = styled("div")`
  display: flex;
  width: 100%;
  height: 64px;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  border-bottom: 2px solid #f8542bb3;
  padding-left: 24px;
  padding-right: 24px;
`;

export const SubContainer = styled("div")`
  display: flex;
  align-items: center;
`;

// export const Container = styled("div")`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   margin: auto;

//   @media (max-width: ${Breakpoint.xs}) {
//     width: 100%;
//   }
//   @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
//     width: 100%;
//   }
//   @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
//     width: 100%;
//   }
//   @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
//     width: 440px;
//   }
//   @media (min-width: ${Breakpoint.lg}) {
//     width: 440px;
//   }
// `;

export const styles = (theme: any) =>
  ({
    appBar: {
      transition: theme.transitions.create(["width", "margin"], {
        duration: theme.transitions.duration.leavingScreen,
        easing: theme.transitions.easing.sharp
      }),
      zIndex: theme.zIndex.drawer + 1
    },
    appBarShift: {
      [theme.breakpoints.up("md")]: {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(["width", "margin"], {
          duration: theme.transitions.duration.enteringScreen,
          easing: theme.transitions.easing.sharp
        }),
        width: `calc(100% - ${drawerWidth}px)`
      }
    },
    flex: {
      flex: 1
    },
    hide: {
      display: "none"
    },
    logo: {
      height: "40px",
      width: "40px"
    },
    menuButton: {
      marginLeft: 12,
      marginRight: 12
    }
  } as any);
