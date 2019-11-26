import styled from "styled-components";

export const Container = styled("div")`
    display: flex;
    width: 100%;
    height: 100px;
    align-items: center;
    justify-content: center;
    margin-bottom: 28px;
`;

export const NavContainer = styled("div")`
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const ValidIcon = styled("div")`
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    background-color: #FB7959;
    border-radius: 50%;
    border: 2px solid #FB7959;
    margin-left: 12px;
    margin-right: 12px;
`;

export const ActiveIcon = styled("div")`
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #FB7959;
    margin-left: 12px;
    margin-right: 12px;
`;

export const InactiveIcon = styled("div")`
    display: flex;
    width: 30px;
    height: 30px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    border: 2px solid #FB7959;
    margin-left: 12px;
    margin-right: 12px;
    opacity: .50;
`;

export const Line = styled("div")`
    width: 36px;
    height: 2px;
    margin-left: 12px;
    margin-right: 12px;
    margin-top: 2px;
    background-color: rgb(237, 237, 237);
`;
