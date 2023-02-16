import { styled } from "@mui/material";

interface InputProps {
  error?: boolean;
}

export const InputContainer = styled("div")`
  margin-bottom: 32px;
`;

export const Input = styled("input")`
  width: 100%;
  height: 42px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
  margin-top: 4px;
  padding-left: 14px;
  font-size: 14px;
  font-family: Muli;

  :focus {
    outline-width: 0;
    border: 1px solid #f97555;
    transition: border 0.25s;
  }

  ${(props: InputProps) =>
    props.error === true &&
    `
      border: 1px solid #E32444;

      :focus{
        border: 1px solid #E32444;
      }
      `}
`;

export const TextArea = styled("textarea")`
  width: 100%;
  height: 126px;
  border-radius: 4px;
  border: 1px solid #dfdfdf;
  background-color: #fafafa;
  margin-top: 4px;
  padding-left: 14px;
  font-size: 14px;
  font-family: Muli;
  resize: none;

  :focus {
    outline-width: 0;
    border: 1px solid #f97555;
    transition: border 0.25s;
  }

  ${(props: InputProps) =>
    props.error === true &&
    `
    border: 1px solid #E32444;

    :focus{
      border: 1px solid #E32444;
    }
    `}
`;

interface SelectionProps {
  selected: boolean;
}

export const Selection = styled("div")`
  width: 200px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props: SelectionProps) =>
    props.selected === true &&
    `
      border: 1px solid #E0694C;
      `}
`;

export const Divider = styled("div")`
  width: 100%;
  border-bottom: 1px solid #e2e2e2;
  margin-top: 28px;
  margin-bottom: 28px;
`;

export const Button = styled("div")`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  width: 100px;
  background: #f87454;
  color: white;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
`;

export const SecondaryButton = styled("div")`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  width: 100px;
  background: #fafafa;
  color: black;
  border: 1px solid #e2e2e2;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
`;

export const MessageContainer = styled("div")`
  display: flex;
  width: 100%;
  border-radius: 4px;
  margin-top: 16px;
`;

export const SuccessIcon = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  background-color: #f87454;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const ErrorIcon = styled("div")`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  background-color: #e32444;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const Message = styled("div")`
  width: 100%;
  padding: 20px;
  border-top: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
`;
