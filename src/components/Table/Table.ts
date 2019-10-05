import styled from "styled-components";

export const Container = styled("div")`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
`;

export const Table = styled("div")`
  width: 100%;
`;

export const HeaderRow = styled("div")`
  display: flex;
  width: 100%;
  height: 48px;
  border-bottom: 1px solid #ededed;
  // Set border-radius for bottom left, bottom right corners
  // border-top-left-radius: 4px;
  // border-top-right-radius: 4px;
`;

interface HeaderCellProps {
  width: string;
  justifyContent?: string;
}

export const HeaderCell = styled("div")`
${(props: HeaderCellProps) => `
  display: flex;
  height: 100%;
  width: ${props.width};
  justify-content: ${props.justifyContent};
  color: #1C1C1C;
  padding: 12px;
  align-items: center;
  opacity: 0.85;
  font-family: "Poppins";
  font-weight: 500;
  font-size: 12px;
  user-select: none;

`}
`;

export const UpArrow = styled("div")`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid black;
  margin-left: 4px;
`;

export const DownArrow = styled("div")`
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid black;
  margin-left: 4px;
`;

export const Row = styled("div")`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #EDEDED;
  &:hover {
    background-color: #fcfcfc;
  }
  overflow-wrap: break-word;
`;

interface CellProps {
  width: string;
  justifyContent?: string;
}

export const Cell = styled("div")`
${(props: CellProps) => `
  display: flex;
  height: 100%;
  width: ${props.width};
  justify-content: ${props.justifyContent};
  padding: 12px;
  align-items: center;
  font-family: "Muli";
  font-size: 13px;
  color: #1C1C1CE6;
  `}
`;

export const CellText = styled("span")`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Pagination = styled("div")`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-top: 28px;
  margin-right: 12px;
  margin-left: 12px;
`;

export const PageSelect = styled("div")`
  display: flex;
`;

export const ButtonContainer = styled("div")`
  display: flex;
`;

export const Button = styled("button")`
  margin-top: -5px;
  background-color: #fafafa;
  border-radius: 6px;
`;

export const TableRow = styled("div")`
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #f4f4f5;
  &:hover {
    background-color: #fcfcfc;
  }
  overflow-wrap: break-word;
`;

export const RowCell = styled("div")`
  display: flex;
  height: 100%;
  align-items: center;
  // put in text
  opacity: 0.9;
  white-space: nowrap;
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

// To Delete
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