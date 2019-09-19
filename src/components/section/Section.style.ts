import styled from "styled-components";

interface SectionProps {
    width?: string;
}

export const Section = styled("div")`
${(props: SectionProps) => `
    width: ${props.width};
    margin-right: 28px;
    border-radius: 4px;
    border: 1px solid #ededed;
    padding: 28px;`
    }
`;

export const SectionHeader = styled("div")`
    font-family: "Poppins";
    font-size: 22px;
    margin-top: 56px;
    margin-bottom: 28px;
`;

export const InnerContainer = styled("div")`
    display: flex;
    width: 100%;
`;