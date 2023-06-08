import {
  Box,
  Button,
  Stack,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface Props {
  steps: {
    label: string;
    component: React.ReactNode;
  }[];
  finalComponent: React.ReactNode;
}

export function StepsButton({ steps, finalComponent }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ width: "100%" }}>
      {steps[activeStep].component}
      <Stepper activeStep={activeStep} sx={{ mt: 1 }}>
        {steps.map((s) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={s.label} {...stepProps}>
              <StepLabel>{s.label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
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
            setActiveStep(activeStep - 1);
          }}
        >
          Back
        </Button>
        <Button
          sx={{
            visibility: activeStep < steps.length - 1 ? "visible" : "hidden",
          }}
          size="large"
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            setActiveStep(activeStep + 1);
          }}
        >
          Next
        </Button>
        {activeStep === steps.length - 1 && <>{finalComponent}</>}
      </Stack>
    </Box>
  );
}
