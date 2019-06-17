import styled from "styled-components";

interface ButtonProps {
  type: string;
  size: string;
  disabled?: boolean;
}

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  // ** Type ** 
  ${(props: Partial<ButtonProps>) =>
    props.type === "primary" &&
    `
    background-color: #ff7654;
    transition: 0.3s ease all;
    cursor: pointer;
    color: white;
    user-select: none;

    &:hover {
      background-color: #e56a4b;
    }
  `}

  ${(props: Partial<ButtonProps>) =>
    props.type === "primary-outline" &&
    `
    background-color: white;
    border: 1px solid #ff7654;
    transition: 0.3s ease all;
    cursor: pointer;
    color: #ff7654;
    user-select: none;

    &:hover {
      background-color: #ff7654;
      color: white;
    }
  `}

  // ** Size ** 
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
    width: 150px;
    font-size: 14px;
    font-weight: 600;
  `}

  ${(props: Partial<ButtonProps>) =>
    props.size === "small" &&
    `
    border-radius: 100px 100px 100px 100px;
    height: 35px;
    width: 110px;
    font-size: 15px;
  `}
  
  // ** Disabled **
  ${(props: Partial<ButtonProps>) =>
    props.disabled &&
    `
      visibility: hidden;
  `}
`;

export default Button;
