import {
  Box,
  Button,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { DispatchWithoutAction } from "react";

export enum Steps {
  ADS = 1,
  FINALIZE = 2,
}

interface Props {
  step: Steps;
  onNext: DispatchWithoutAction;
  onPrev: DispatchWithoutAction;
}

export function SetupProgress({ step, onNext, onPrev }: Props) {
  return (
    <Box margin={2}>
      <Typography variant="h2" marginBottom={2}>
        Setup Progress
      </Typography>

      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>Advertiser profile</StepLabel>
        </Step>
        <Step>
          <StepLabel>Review ads</StepLabel>
          <StepContent>
            <Button variant="contained" onClick={onNext} sx={{ mt: 1, mr: 1 }}>
              Proceed
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Finalize & submit</StepLabel>
          <StepContent>
            <Button variant="outlined" onClick={onPrev} sx={{ mt: 1, mr: 1 }}>
              Back
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
              Submit
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
