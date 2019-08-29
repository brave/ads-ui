import styled from "styled-components";

interface IMenuProps {
    open: boolean;
}
export const Menu = styled("div")`
  position: absolute;
  width: 230px;
  background-color: white;
  border-radius: 6px;
  box-shadow: rgba(99, 105, 110, 0.18) 0px 1px 12px 0px;
  top: 35px;
  left: -190px;
  z-index: 9001;
  ${(props: Partial<IMenuProps>) =>
        props.open === false &&
        `
      visibility: hidden;
  `}
`;

export const MenuItem = styled("div")`
  height: 60px;
  width: 100%;
  margin-top: 8px;
  margin-bottom: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  user-select: none;
  &:hover {
    background-color: #fafafa;
    color: #3f404b;
  }
`;

interface IStatisticProps {
    selected: boolean;
    color: string;
}
export const Statistic = styled("div")`
    display: flex; 
    justify-content: center;
    align-items: flex-end;
    text-align: left;
    user-select: none;
    cursor: pointer;
    padding-bottom: 12px;
    padding-left: 6px;
    padding-right: 6px;
    margin-right: 24px; 
    border-bottom: 2px solid #00000000;
    transition: border-bottom 0.1s linear;

    ${(props: Partial<IStatisticProps>) =>
        props.selected === true &&
        `
        border-bottom: 2px solid ${props.color}
        `
    }
`;
