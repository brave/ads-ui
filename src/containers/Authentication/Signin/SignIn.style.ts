import { styled } from "@mui/material";
import BraveLogo from "../../../assets/images/brave-logotype-full-color.png";

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  margin: auto;

  @media (max-width: ${Breakpoint.xs}) {
    width: 100%;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    width: 100%;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    width: 100%;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    width: 440px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    width: 440px;
  }
`;

export const Content = styled("div")`
  width: 100%;
`;

export const Header = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 12px;
`;

export const Logo = styled("div")`
  width: 150px;
  height: 50px;
  margin-bottom: 24px;
  background: url(${BraveLogo}) no-repeat center;
  background-size: 100%;
`;

export const ButtonContainer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 38px;
`;

export const Footer = styled("div")`
  display: flex;
  justify-content: center;
  margin-top: 36px;
`;

export const styles: any = {
  image: {
    width: "100px"
  },
  root: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    minWidth: "500px",
    padding: "10px"
  },
  row1: {
    display: "flex",
    flex: 1,
    flexDirection: "row"
  },
  row1_column1: {
    flexBasis: "50%",
    flexGrow: 0,
    flexShrink: 0
  },
  row1_column2: {
    alignItems: "center",
    display: "flex",
    flexBasis: "50%",
    flexDirection: "column",
    flexGrow: 0,
    flexShrink: 0,
    justifyContent: "center"
  },
  row2: {
    flexBasis: "50px"
  },
  signuplink: {
    margin: "15px",
    textDecoration: "none"
  }
};
