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
import { NextAndBack } from "components/Steps/NextAndBack";

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
      <NextAndBack
        activeStep={activeStep}
        steps={steps.length - 1}
        onNext={() => setActiveStep(activeStep + 1)}
        onBack={() => setActiveStep(activeStep - 1)}
        final={finalComponent}
      />
    </Box>
  );
}
