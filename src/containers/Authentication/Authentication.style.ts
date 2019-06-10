import styled from "styled-components";

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const Container = styled("div")`
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(
    ellipse 100% 100% at 0% 0%,
    rgb(57, 45, 209, 0.8) 0%,
    rgb(255, 67, 67, 0.8) 100%
  );
  width: 100%;
  height: 100%;
`;

export const Content = styled("div")`
  height: 520px;
  margin: 28px;

  @media (max-width: ${Breakpoint.xs}) {
    max-width: 550px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    max-width: 550px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    max-width: 550px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    width: 750px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    width: 750px;
  }
`;

export const styles: any = {
  paper: {
    display: "flex",
    flexDirection: "column",
    minHeight: "300px",
    minWidth: "300px"
  },
  root: {
    alignItems: "center",
    display: "flex",
    height: "100%",
    justifyContent: "center"
  },
  tabContent: {
    flex: 1
  }
};
