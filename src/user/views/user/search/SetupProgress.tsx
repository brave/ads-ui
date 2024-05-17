import { Trans } from "@lingui/macro";
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
        <Trans>Setup Progress</Trans>
      </Typography>

      <Stepper activeStep={step} orientation="vertical">
        <Step>
          <StepLabel>
            <Trans>Advertiser profile</Trans>
          </StepLabel>
        </Step>
        <Step>
          <StepLabel>
            <Trans>Review ads</Trans>
          </StepLabel>
          <StepContent>
            <Button variant="contained" onClick={onNext} sx={{ mt: 1, mr: 1 }}>
              <Trans>Proceed</Trans>
            </Button>
          </StepContent>
        </Step>
        <Step>
          <StepLabel>
            <Trans>Finalize & submit</Trans>
          </StepLabel>
          <StepContent>
            <Button variant="outlined" onClick={onPrev} sx={{ mt: 1, mr: 1 }}>
              <Trans>Back</Trans>
            </Button>
            <Button variant="contained" type="submit" sx={{ mt: 1, mr: 1 }}>
              <Trans>Submit</Trans>
            </Button>
          </StepContent>
        </Step>
      </Stepper>
    </Box>
  );
}
