import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
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
import { useUploadFile } from "components/Assets/hooks/useUploadFile";
import { NewImageButton } from "components/Navigation/NewImageButton";

export interface UploadConfig {
  targetHost: () => string;
  requiresPublishStep: boolean;
  endpoint: string;
}

interface Props {
  useInlineCreation?: boolean;
  onComplete?: (url: string) => void;
  onClose?: () => void;
}

export function UploadImage({ useInlineCreation, onClose, onComplete }: Props) {
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState<File>();
  const [{ upload, reset }, { step, error, loading, state }] = useUploadFile({
    onComplete(data) {
      if (useInlineCreation && onComplete) {
        onComplete(data);
      }
    },
  });

  useEffect(() => {
    if (useInlineCreation) {
      setOpen(true);
    }
  }, [useInlineCreation]);

  return (
    <>
      {useInlineCreation === undefined && (
        <NewImageButton onClick={() => setOpen(true)} />
      )}
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Upload Image</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Uploaded images can be shared across different Ad Sets within a
            Campaign. For best quality, upload images at 900x750px resolution.
            Images will be automatically scaled to this size.
          </DialogContentText>

          <Stepper activeStep={step} sx={{ mt: 3 }}>
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

          <Box mt={3}>
            {step === 0 && file === undefined && (
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
            {step === 0 && !!file && (
              <Chip
                onDelete={() => setFile(undefined)}
                label={file.name}
                sx={{ marginBottom: 1 }}
              />
            )}

            {!error && state && (
              <Alert severity={step !== 2 ? "info" : "success"}>{state}</Alert>
            )}
            {error !== undefined && <Alert severity="error">{error}</Alert>}
            {loading && <LinearProgress sx={{ mt: 1 }} />}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpen(false);
              setFile(undefined);
              reset!();
              if (onClose) onClose();
            }}
            variant="outlined"
          >
            {step === 2 ? "Close" : "Cancel"}
          </Button>
          {step !== 2 && (
            <Button
              disabled={file === undefined || step !== 0}
              onClick={() => {
                void upload!(file!, CampaignFormat.NewsDisplayAd);
              }}
              variant="contained"
            >
              Upload
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
