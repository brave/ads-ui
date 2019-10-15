import styled from "styled-components";

export const Container = styled("div")`
  display: flex; 
  margin-top: 28px; 
  margin-bottom: 28px; 
  border-bottom: 1px solid #ededed;
`;

interface TabProps {
  selected: boolean;
}
export const Tab = styled("div")`

margin-right: 28px;
margin-bottom: 0px;
padding-bottom: 14px;
font-family: "Muli";
font-size: 16px;
${(props: TabProps) =>
    props.selected === true &&
    `
    border-bottom: 3px solid #FA8A73;
    `
  }
`;

