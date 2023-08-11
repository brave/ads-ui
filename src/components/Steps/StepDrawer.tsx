import { PropsWithChildren, ReactNode, useRef } from "react";
import {
  Box,
  CssBaseline,
  Drawer,
  Stack,
  Step,
  StepButton,
  StepContent,
  Stepper,
  Toolbar,
} from "@mui/material";
import { NextAndBack } from "components/Steps/NextAndBack";
import { useHistory } from "react-router-dom";
import { ActionButtons } from "components/Steps/ActionButtons";

const drawerWidth = 250;

interface Props {
  steps: {
    label: string;
    path: string;
    queryParams?: string;
    content?: ReactNode;
  }[];
  finalComponent: ReactNode;
}

export function StepDrawer({
  steps,
  finalComponent,
  children,
}: Props & PropsWithChildren) {
  const history = useHistory();
  const activeStep = useRef<number>(0);
  activeStep.current = steps.findIndex((s) =>
    history.location.pathname.includes(s.path),
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
          <Stepper
            nonLinear
            activeStep={activeStep.current}
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={step.label} completed={activeStep.current > index}>
                <StepButton
                  onClick={() => {
                    history.push(`${step.path}${step.queryParams ?? ""}`);
                    activeStep.current = index;
                  }}
                >
                  {step.label}
                </StepButton>
                {step.content && <StepContent>{step.content}</StepContent>}
              </Step>
            ))}
          </Stepper>
          <ActionButtons />
        </Box>
      </Drawer>
      <Stack flexGrow={1}>
        {children}
        <NextAndBack
          activeStep={activeStep.current}
          steps={steps.length - 1}
          onNext={() => {
            const step = activeStep.current + 1;
            activeStep.current = step;
            history.replace(steps[step].path);
          }}
          onBack={() => {
            const step = activeStep.current - 1;
            activeStep.current = step;
            history.replace(steps[step].path);
          }}
          final={finalComponent}
        />
      </Stack>
    </Box>
  );
}
