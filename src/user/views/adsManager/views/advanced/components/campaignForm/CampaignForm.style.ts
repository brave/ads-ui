import { styled } from "@mui/material";

export const Container = styled("div")`
  width: 75%;
  margin-right: auto;
`;

export const InnerContainer = styled("div")`
  display: flex;
  width: 100%;
`;

export const LeftColumn = styled("div")`
  width: 30%;
  margin-right: 56px;
`;

export const RightColumn = styled("div")`
  width: 100%;
`;

export const InputContainer = styled("div")`
  margin-bottom: 32px;
`;

export const SwitchContainer = styled("div")`
  margin-bottom: 56px;
`;

export const AdSetsTabs = styled("div")`
  border-left: 1px solid #e2e2e2;
  border-top: 1px solid #e2e2e2;
  border-radius: 4px;
`;

export const ActiveAdSetsTab = styled("div")`
  border-bottom: 1px solid #e2e2e2;
  border-right: 4px solid #FB7959;
  border-top-right-radius: 4px;
  padding: 28px;
`;

export const InactiveAdSetsTab = styled("div")`
  border-bottom: 1px solid #e2e2e2;
  border-right: 1px solid #e2e2e2;
  background-color: #fafafa;
  border-top-right-radius: 4px;
  padding: 28px;
  cursor: pointer;
`;

export const AdSetsTabButtonContainer = styled("div")`
  padding: 16px;
  border-right: 1px solid #e2e2e2;
  border-bottom: 1px solid #e2e2e2;
  border-bottom-right-radius: 4px;
  border-bottom-left-radius: 4px;
`;

interface CurrencySelectionProps {
  selected: boolean;
}

export const CurrencySelection = styled("div")`
  width: 130px;
  height: 80px;
  border-radius: 4px;
  border: 1px solid #e2e2e2;
  margin-right: 28px;
  cursor: pointer;

  ${(props: CurrencySelectionProps) =>
    props.selected === true &&
    `
    border: 1px solid #F97555;
    `
  }
`;

interface InputProps {
  error?: boolean;
}

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

  :focus{
    outline-width: 0;
    border: 1px solid #F97555;
    transition: border .25s;
  }

  ${(props: InputProps) =>
    props.error === true &&
    `
    border: 1px solid #E32444;

    :focus{
      border: 1px solid #E32444;
    }
    `
  }

`

interface ObjectiveProps {
  selected: boolean;
}

export const Objective = styled("div")`
  width: 200px;
  border: 1px solid #e2e2e2;
  border-radius: 4px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  ${(props: ObjectiveProps) =>
    props.selected === true &&
    `
    border: 1px solid #E0694C;
    `
  }
`;

export const Button = styled("div")`
  display: flex;
  justify-content: center;
  padding: 0px 20px;
  width: 100px;
  background: #4C54D2;
  color: white;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
`;

export const LeftColumnContainer = styled("div")`
  width: 100%;
  margin-top: 64px;
`;
