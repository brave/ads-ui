import styled from "styled-components";

export const Container = styled("div")`
  width: 100%;
  margin-left: auto;
  margin-right: auto;
`;

export const InnerContainer = styled("div")`
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