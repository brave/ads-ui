import styled from "styled-components";

export const TableHeader = styled("div")`
  display: flex;
  height: 65px;
  justify-content: space-between;
  align-items: center;
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
  padding-left: 12px;
  padding-right: 12px;
`;

export const HeaderCell = styled("div")`
  text-transform: uppercase;
  opacity: 0.85;
  width: 110px;
`;

export const TableRow = styled("div")`
  display: flex;
  height: 65px;
  justify-content: space-between;
  border-bottom: 1px solid #e0e0e0;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
`;

export const RowCell = styled("div")`
  width: 110px;
  opacity: 0.9;
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
  height: 10px;
  width: 10px;
  background-color: #20c997;
  opacity: 0.9;
  margin-right: 4px;
`;
