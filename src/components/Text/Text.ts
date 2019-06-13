import styled from "styled-components";

interface TextProps {
  fontFamily: string;
  fontWeight?: number;
  color?: string;
  link?: boolean;
}

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px"
}

export const H1 = styled("div")`
  // ** Font Size **
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

  // ** Font Family **
  ${(props: TextProps) =>
    `
    font-family: ${props.fontFamily};

    `}

  // ** Font Weight **
  ${(props: TextProps) =>
    `
    font-weight: ${props.fontWeight};

    `}

  // ** Color **
  ${(props: TextProps) =>
    `
    color: ${props.color};

    `}

  // ** Link ** 
  ${props =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;

export const H2 = styled("div")`
  // ** Font Size **
  @media (max-width: ${Breakpoint.xs}) {
    font-size: 26px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    font-size: 26px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    font-size: 26px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    font-size: 30px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    font-size: 30px;
  }

  // ** Font Family **
  ${(props: TextProps) =>
    `
    font-family: ${props.fontFamily};

    `}

  // ** Font Weight **
  ${(props: TextProps) =>
    `
    font-weight: ${props.fontWeight};

    `}
  
  // ** Color **
  ${(props: TextProps) =>
    `
    color: ${props.color};

    `}

  // ** Link ** 
  ${props =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;

export const H6 = styled("div")`
  // ** Font Size **
  @media (max-width: ${Breakpoint.xs}) {
    font-size: 14px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    font-size: 14px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    font-size: 14px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    font-size: 18px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    font-size: 18px;
  }

  // ** Font Family **
  ${(props: TextProps) =>
    `
    font-family: ${props.fontFamily};

    `}

  // ** Font Weight **
  ${(props: TextProps) =>
    `
    font-weight: ${props.fontWeight};

    `}

  // ** Color **
  ${(props: TextProps) =>
    `
    color: ${props.color};

    `}

  // ** Link ** 
  ${props =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;
