import React, { useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextAndBack } from "components/Steps/NextAndBack";

const drawerWidth = 250;

interface Props {
  steps: {
    label: string;
    description: string;
    component: React.ReactNode;
  }[];
  finalComponent: React.ReactNode;
}

export function StepDrawer({ steps, finalComponent }: Props) {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Toolbar />
        <Box ml={2} mt={1}>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label} onClick={() => setActiveStep(index)}>
                <StepButton>{step.label}</StepButton>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Drawer>
      <Stack flexGrow={1}>
        <Box>{steps[activeStep].component}</Box>
        <NextAndBack
          activeStep={activeStep}
          steps={steps.length - 1}
          onNext={() => setActiveStep(activeStep + 1)}
          onBack={() => setActiveStep(activeStep - 1)}
          final={finalComponent}
        />
      </Stack>
    </Box>
  );
}
