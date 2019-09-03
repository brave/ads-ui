import styled from "styled-components";

export const Table = styled("div")`
  width: 100%;
`;

export const TableHeader = styled("div")`
  display: flex;
  width: 100%;
  height: 48px;
  align-items: center;
  border-bottom: 2px solid #f4f4f5;
  user-select: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const HeaderRow = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

export const HeaderCell = styled("div")`
  display: flex;
  align-items: center;
  opacity: 0.85;
  width:115px;
`;

export const TableRow = styled("div")`
  display: flex;
  height: 60px;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #f4f4f5;
  &:hover {
    background-color: #fcfcfc;
  }
  overflow-wrap: break-word;
`;

export const RowCell = styled("div")`
  display: flex;
  align-items: center;
  width: 115px;
  height: 100%;
  opacity: 0.9;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

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
  margin-bottom: 1px;
`;

export const PendingSymbol = styled("div")`
  border-radius: 100%;
  height: 9px;
  width: 9px;
  background-color: #d1d1da;
  opacity: 0.9;
  margin-right: 5px;
  margin-top: 6px;
  margin-bottom: 1px;
`;
