import styled from "styled-components";

interface ButtonProps {
  size: string;
  disabled?: boolean;
}

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7654;
  cursor: pointer;
  color: white;
  user-select: none;
  transition: 0.3s ease all;

  ${(props: Partial<ButtonProps>) =>
    props.size === "large" &&
    `
    border-radius: 100px 100px 100px 100px;
    height: 56px;
    width: 155px;
    font-size: 24px;
  `}

  ${(props: Partial<ButtonProps>) =>
    props.size === "medium" &&
    `
    border-radius: 100px 100px 100px 100px;
    height: 45px;
    width: 130px;
    font-size: 19px;
  `}
  
  
  ${(props: Partial<ButtonProps>) =>
    props.disabled &&
    `
      visibility: hidden;
  `}

  &:hover {
    background-color: #e56a4b;
  }
`;

export default Button;
