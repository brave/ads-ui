import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  width: 100%;
`;

export const LeftColumn = styled("div")`
  width: 30%;
  margin-right: 56px;
`;

export const RightColumn = styled("div")`
  width: 100%;
`;

export const InputContainer = styled("div")`
  margin-bottom: 56px;
`;

export const SwitchContainer = styled("div")`
  margin-bottom: 56px;
`;

export const AdSetsTabs = styled("div")`
  border-left: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-radius: 4px;
`;

export const ActiveAdSetsTab = styled("div")`
  border-bottom: 1px solid #e2e2e2;
  border-right: 4px solid #FB7959;
  border-top-right-radius: 4px;
  padding: 28px;
`;

export const InactiveAdSetsTab = styled("div")`
  border-bottom: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  background-color: #fafafa;
  border-top-right-radius: 4px;
  padding: 28px;
  cursor: pointer;
`;

export const AdSetsTabButtonContainer = styled("div")`
  padding: 16px;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Input = styled("input")`
  width: 100%;
  height: 45px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
  margin-top: 28px;
  padding-left: 14px;
  font-size: 16px;
  font-family: Muli;
`

export const Button = styled("div")`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  width: 100px; 
  background: #4C54D2;
  color: white;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
`;

export const LeftColumnContainer = styled("div")`
  width: 100%;
  margin-top: 64px;
`;
