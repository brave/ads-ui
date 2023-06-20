import { Button, Stack, stepClasses } from "@mui/material";
import React from "react";

interface Props {
  activeStep: number;
  steps: number;
  onNext: () => void;
  onBack: () => void;
  final: React.ReactNode;
}

export function NextAndBack({
  activeStep,
  steps,
  onNext,
  onBack,
  final,
}: Props) {
  return (
    <Stack
      direction="row"
      spacing={1}
      mt={2}
      justifyContent="space-between"
      alignItems="center"
    >
      <Button
        sx={{ visibility: activeStep !== 0 ? "visible" : "hidden" }}
        size="large"
        variant="text"
        onClick={(e) => {
          e.preventDefault();
          onBack();
        }}
      >
        Back
      </Button>
      <Button
        sx={{
          visibility: activeStep < steps ? "visible" : "hidden",
        }}
        size="large"
        variant="contained"
        onClick={(e) => {
          e.preventDefault();
          onNext();
        }}
      >
        Next
      </Button>
      {activeStep === steps && <>{final}</>}
    </Stack>
  );
}
