import { styled } from "@mui/system";

// TODO - Define sizes array more formally
// ["xs", "sm", "md", "lg", "xl"]
interface TextProps {
  fontFamily: string;
  content?: string;
  sizes?: any[];
  fontWeight?: number;
  color?: string;
  link?: boolean;
}

enum Breakpoint {
  xs = "576px",
  sm = "768px",
  md = "992px",
  lg = "1200px",
}

export const Text = styled("div")`
  ${(props: TextProps) => `
    @media (max-width: ${Breakpoint.xs}) {
      font-size: ${props.sizes![0] + "px"};
    }
    @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
      font-size: ${props.sizes![1] + "px"};
    }
    @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
      font-size: ${props.sizes![2] + "px"};
    }
    @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
      font-size: ${props.sizes![3] + "px"};
    }
    @media (min-width: ${Breakpoint.lg}) {
      font-size: ${props.sizes![4] + "px"};
    }
  `}

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
  ${(props) =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}

  ${(props) =>
    props.content &&
    `
    &::after {
      content: "${props.content}";
    }
  `}
`;

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
  ${(props) =>
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
  ${(props) =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;

export const H5 = styled("div")`
  // ** Font Size **
  @media (max-width: ${Breakpoint.xs}) {
    font-size: 18px;
  }
  @media (min-width: ${Breakpoint.xs}) and (max-width: ${Breakpoint.sm}) {
    font-size: 18px;
  }
  @media (min-width: ${Breakpoint.sm}) and (max-width: ${Breakpoint.md}) {
    font-size: 18px;
  }
  @media (min-width: ${Breakpoint.md}) and (max-width: ${Breakpoint.lg}) {
    font-size: 22px;
  }
  @media (min-width: ${Breakpoint.lg}) {
    font-size: 16px;
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
  ${(props) =>
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
  ${(props) =>
    props.link &&
    `
    color: #ff7654;
    cursor: pointer;
  `}
`;
