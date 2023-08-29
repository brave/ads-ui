import { useState } from "react";
import { useUploadFile } from "user/hooks/useUploadFile";
import {
  Alert,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import { CampaignFormat } from "graphql/types";

export interface UploadConfig {
  targetHost: () => string;
  requiresPublishStep: boolean;
  endpoint: string;
}

export function UploadImage() {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [{ upload }, { step, error, loading, state }] = useUploadFile();

  return (
    <Box>
      <Button onClick={() => setOpen(true)}>Upload Image</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Uploaded images can be shared across different Ad Sets within a
            Campaign. For best quality, upload images at 900x750px resolution.
            Images will be automatically scaled to this size.
          </DialogContentText>

          <Stepper activeStep={step}>
            <Step>
              <StepLabel>Choose</StepLabel>
            </Step>
            <Step>
              <StepLabel>Upload</StepLabel>
            </Step>
            <Step>
              <StepLabel>Complete</StepLabel>
            </Step>
          </Stepper>

          <Box my={2} height={80} width={400}>
            {step === 0 && (
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: 1 }}
              >
                Choose File
                <input
                  type="file"
                  hidden
                  accept=".jpg, .jpeg, .png, .gif"
                  onChange={(e) => setFile(e.target?.files?.[0])}
                />
              </Button>
            )}

            {!error && state && (
              <Alert severity={step !== 2 ? "info" : "success"}>{state}</Alert>
            )}
            {error !== undefined && <Alert severity="error">{error}</Alert>}
            {loading && <LinearProgress />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            disabled={file === undefined}
            onClick={() => {
              upload!(file!, CampaignFormat.NewsDisplayAd);
            }}
          >
            Upload
          </Button>
          <Button
            onClick={() => {
              setFile(undefined);
              setOpen(false);
            }}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
