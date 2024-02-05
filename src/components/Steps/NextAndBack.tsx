import { Button, Stack } from "@mui/material";
import { ReactNode } from "react";
import { Trans } from "@lingui/macro";

interface Props {
  activeStep: number;
  steps: number;
  onNext: () => void;
  onBack: () => void;
  disabled?: boolean;
  final: ReactNode;
}

export function NextAndBack({
  activeStep,
  steps,
  onNext,
  onBack,
  final,
  disabled,
}: Props) {
  return (
    <Stack direction="row" mt={3} spacing={2} justifyContent="right">
      {activeStep !== 0 && (
        <Button
          size="large"
          variant="text"
          onClick={(e) => {
            e.preventDefault();
            onBack();
          }}
        >
          <Trans>Back</Trans>
        </Button>
      )}
      {activeStep < steps && (
        <Button
          size="large"
          variant="contained"
          disabled={disabled}
          onClick={(e) => {
            e.preventDefault();
            onNext();
          }}
        >
          <Trans>Next</Trans>
        </Button>
      )}
      {activeStep === steps && <>{final}</>}
    </Stack>
  );
}
