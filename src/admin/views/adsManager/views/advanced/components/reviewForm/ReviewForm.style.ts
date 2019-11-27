import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  width: 100%;
`;

export const FlexContainer = styled("div")`
  display: flex;
`;

export const LeftColumn = styled("div")`
  width: 70%;
`;

export const RightColumn = styled("div")`
  width: 40%;
  margin-left: 56px; 
  margin-top: 61px;
`;

export const Item = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 60px;
  margin-bottom: 40px;
`;

export const Button = styled("div")`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  width: 200px; 
  background: #4C54D2;
  color: white;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
`;