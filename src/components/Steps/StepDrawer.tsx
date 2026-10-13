import { ActionButtons } from "@/components/Steps/ActionButtons";
import { NextAndBack } from "@/components/Steps/NextAndBack";
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
import { PropsWithChildren, ReactNode, useRef } from "react";
import { useHistory } from "react-router-dom";

const drawerWidth = 222;

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
  const activeStepRef = useRef<number>(0);
  activeStepRef.current = steps.findIndex((s) =>
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
            activeStep={activeStepRef.current}
            orientation="vertical"
          >
            {steps.map((step, index) => (
              <Step key={step.path} completed={activeStepRef.current > index}>
                <StepButton
                  onClick={() => {
                    history.replace(`${step.path}${step.queryParams ?? ""}`);
                    activeStepRef.current = index;
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
          activeStep={activeStepRef.current}
          steps={steps.length - 1}
          onNext={() => {
            const step = activeStepRef.current + 1;
            activeStepRef.current = step;
            history.replace(steps[step].path);
          }}
          onBack={() => {
            const step = activeStepRef.current - 1;
            activeStepRef.current = step;
            history.replace(steps[step].path);
          }}
          final={finalComponent}
        />
      </Stack>
    </Box>
  );
}
