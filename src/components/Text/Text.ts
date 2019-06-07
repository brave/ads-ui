import styled from "styled-components";

interface TextProps {
  fontFamily: string;
  fontWeight?: number;
  link?: boolean;
}

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const H1 = styled("div")`
  font-size: 36px;
  ${(props: TextProps) =>
    `
    font-family: ${props.fontFamily};

    `}

  ${props =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
  
  @media (max-width: ${Breakpoint.xs}) {
    font-size: 32px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    font-size: 32px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    font-size: 32px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    font-size: 36px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    font-size: 36px;
  }
`;

export const H6 = styled("div")`
  font-size: 18px;
  ${(props: TextProps) =>
    `
    font-family: ${props.fontFamily};

    `}

  ${props =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;
