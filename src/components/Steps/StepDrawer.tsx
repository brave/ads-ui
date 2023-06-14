import React, { PropsWithChildren, useState } from "react";
import {
  Box,
  Button,
  CssBaseline,
  Drawer,
  ListItemButton,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Toolbar,
  Typography,
} from "@mui/material";
import { NextAndBack } from "components/Steps/NextAndBack";
import { useHistory } from "react-router-dom";

const drawerWidth = 250;

interface Props {
  steps: {
    label: string;
    path: string;
    queryParams?: string;
    content?: React.ReactNode;
  }[];
  finalComponent: React.ReactNode;
}

export function StepDrawer({
  steps,
  finalComponent,
  children,
}: Props & PropsWithChildren) {
  const history = useHistory();
  const [activeStep, setActiveStep] = useState(
    steps.findIndex((s) => history.location.pathname.includes(s.path))
  );

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
              <Step
                key={step.label}
                onClick={() => {
                  history.push(`${step.path}${step.queryParams ?? ""}`);
                  setActiveStep(index);
                }}
              >
                <StepButton>{step.label}</StepButton>
                {step.content && <StepContent>{step.content}</StepContent>}
              </Step>
            ))}
          </Stepper>
        </Box>
      </Drawer>
      <Stack flexGrow={1}>
        {children}
        <NextAndBack
          activeStep={activeStep}
          steps={steps.length - 1}
          onNext={() => {
            setActiveStep(activeStep + 1);
            history.replace(steps[activeStep + 1].path);
          }}
          onBack={() => {
            setActiveStep(activeStep - 1);
            history.replace(steps[activeStep - 1].path);
          }}
          final={finalComponent}
        />
      </Stack>
    </Box>
  );
}
