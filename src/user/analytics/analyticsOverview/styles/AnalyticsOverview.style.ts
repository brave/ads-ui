import styled from "styled-components";

interface GroupingProps {
    selected: boolean
}

export const Grouping = styled("div")`
${(props: GroupingProps) => `
    font-size: 14px;
    font-family: Poppins;
    margin-right: 28px;
    cursor: pointer;
    color: ${props.selected ? "#FB7959;" : "black;"}
`}`;
