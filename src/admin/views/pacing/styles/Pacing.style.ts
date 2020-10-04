import styled from "styled-components";

export const SearchInput = styled("input")`
  border: none;
  width: 90%;
  height: 90%;
  font-size: 13px;
  font-family: Muli;

  :focus{
    outline-width: 0;
    border: none;
  }
`;

export const RejectedSymbol = styled("div")`
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-bottom: 12px solid #e32444;
  opacity: 0.9;
  margin-right: 3px;
`;

export const ActiveSymbol = styled("div")`
  border-radius: 100%;
  height: 9px;
  width: 9px;
  background-color: #07C806;
  opacity: 0.9;
  margin-right: 5px;
  margin-top: 6px;
  margin-bottom: 4px;
`;

export const PendingSymbol = styled("div")`
  border-radius: 100%;
  height: 9px;
  width: 9px;
  background-color: #d1d1da;
  opacity: 0.9;
  margin-right: 5px;
  margin-top: 6px;
  margin-bottom: 4px;
`;
