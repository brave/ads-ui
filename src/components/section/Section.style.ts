import styled from "styled-components";

interface SectionProps {
    width?: string;
    marginBottom?: string;
}

export const Section = styled("div")`
${(props: SectionProps) => `
    width: ${props.width};
    margin-bottom: ${props.marginBottom}
    margin-right: 28px;
    border-radius: 4px;
    border: 1px solid #e2e2e2;
    padding: 28px;`
    }
`;

export const SectionHeader = styled("div")`
    font-family: "Poppins";
    font-size: 22px;
    margin-bottom: 28px;
`;

export const InnerContainer = styled("div")`
    display: flex;
    width: 100%;
`;