import styled from "styled-components";

interface ChipProps {
    selected: boolean;
}

export const Chip = styled("div")`
${(props: ChipProps) => `
  display: inline-block
  padding: 0px 20px;
  border: ${props.selected ? "1px solid #F87454" : "1px solid #EDEDED"}
  border-radius: 100px 100px 100px 100px;
  background-color: ${props.selected && "#F87454"}
  color: ${props.selected && "white"}
  cursor: pointer;
`}
`;

export const SubContainer = styled("div")`
  display: flex;
  align-items: center;
  background: #F87454;
`;
