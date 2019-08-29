import styled from "styled-components";

export const Table = styled("div")`
  width: 100%;
`;

export const TableHeader = styled("div")`
  display: flex;
  width: 100%;
  height: 65px;
  align-items: center;
  background-color: #fafafa;
  border-bottom: 1px solid #e0e0e0;
  user-select: none;
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

export const HeaderRow = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding-left: 12px;
  padding-right: 12px;
`;

export const HeaderCell = styled("div")`
  display: flex;
  align-items: center;
  text-transform: uppercase;
  opacity: 0.85;
  width:115px;
`;

export const TableRow = styled("div")`
  display: flex;
  height: 85px;
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
  width: 115px;
  height: 100%;
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const PageInputContainer = styled("div")`
  display: flex;
  align-items: center;
  border: 1px solid #dbdbdb;
  height: 32px;
  width: 45px;
  border-radius: 4px;
  margin-top: -5px;
  margin-left: 8px;
  margin-right: 8px;
`;

export const PageInput = styled("div")`
    border: none;
    width: 90%;
    height: 90%;
    fontsize: 14px;
    fontfamily: Poppins;
    fontweight: 400;
`;