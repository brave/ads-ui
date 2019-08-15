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
  width:125px;
`;

export const TableRow = styled("div")`
  display: flex;
  height: 55px;
  justify-content: space-between;
  align-items: center;
  padding-left: 12px;
  padding-right: 12px;
  border-bottom: 1px solid #e6eaea;
  &:hover {
    background-color: #fafafa;
    color: #3f404b;
  }
  overflow-wrap: break-word;
`;

export const RowCell = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 125px;
  height: 100%;
  opacity: 0.9;
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
