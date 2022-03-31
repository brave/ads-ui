

import styled from "styled-components";

const drawerWidth = 240;

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

interface ContainerProps {
  loading: boolean;
}
export const Container = styled("div")`
${(props: ContainerProps) => `
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: ${props.loading ? "2px solid #F6F6F5;" : "2px solid #FB7959;"}
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding-left: 24px;
  padding-right: 24px;
`}
`;

export const SubContainer = styled("div")`
  display: flex;
  align-items: center;
`;

export const SearchContainer = styled("div")`
  display: flex;
  align-items: center;
  border: 1px solid #dbdbdb;
  height: 36px;
  width: 478px;
  border-radius: 4px;
`;

export const SearchInput = styled("input")`
  border: none;
  width: 90%;
  height: 90%;
  fontsize: 14px;
  fontfamily: Poppins;
  fontweight: 400;
`;

export const Logo = styled("img")`
  @media (max-width: ${Breakpoint.xs}) {
    height: 26px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    height: 26px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    height: 26px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    height: 30px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    height: 30px;
  }
`;

// export const Container = styled("div")`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   height: 100%;
//   margin: auto;
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
