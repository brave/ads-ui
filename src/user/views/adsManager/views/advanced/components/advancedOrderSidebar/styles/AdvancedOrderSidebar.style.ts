import { styled } from "@mui/material";

interface NavProps {
    selected: boolean;
}

export const SideBar = styled("div")`
    width: 255px;
    min-height: 150vh;
    left: 0;
    top: 64px;
    bottom: 0;
    padding-top: 56px;
    border-right: 1px solid #e2e2e2;
`;

export const NavInnerContainer = styled("div")`
    margin: 28px;
`;

export const NavHeader = styled("div")`
    display: flex;
    align-items: center;
    margin-bottom: 8px;
`;

export const NavSubHeader = styled("div")`
    margin-left: 4px;
`;

export const NavSubItem = styled("div")`
    display: flex;
    margin-top: -8px;
`;


export const Nav = styled("div")`
display: flex;
position: relative;
align-items: center;
border-top: 1px solid #e2e2e2;
width: 100%;
cursor: pointer;

:hover{
    background-color: #fafafa;
    color: #3F404B;

}

  // ** Selected **
  ${(props: NavProps) => ``}

  ${props =>
        props.selected
        && `
      border-right: 3px solid #F8532BCC;
      box-shadow: 1px 0px 0px 0px #F8532BCC;
      `}
`;

export const Bracket = styled("div")`
    height: 20px;
    width: 20px;
    border-left: 2px solid #e2e2e2;
    border-bottom: 2px solid #e2e2e2;
`;

export const OrangeBracket = styled("div")`
    height: 20px;
    width: 20px;
    border-left: 2px solid #F87454;
    border-bottom: 2px solid #F87454;
`;



export const ReviewNav = styled("div")`
display: flex;
align-items: center;
justify-content: center;
border-top: 1px solid #e2e2e2;
border-bottom: 1px solid #e2e2e2;
width: 100%;
cursor: pointer;

:hover{
    background-color: #fafafa;
    color: #3F404B;

}

  // ** Selected **
  ${(props: NavProps) => ``}

  ${props =>
        props.selected
        && `
      border-right: 3px solid #F8532BCC;
      box-shadow: 1px 0px 0px 0px #F8532BCC;
      `}
`;


