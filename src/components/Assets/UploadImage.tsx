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
import { CampaignFormat } from "@/graphql/types";
import { useUploadFile } from "@/components/Assets/hooks/useUploadFile";
import { NewImageButton } from "@/components/Navigation/NewImageButton";
import { Trans } from "@lingui/macro";

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
        <DialogTitle>
          <Trans>Upload Image</Trans>
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Trans>
              Uploaded images can be shared across different ad sets within a
              Campaign. For best quality, upload images at 900x750px resolution.
              Images will be automatically scaled to this size.
            </Trans>
          </DialogContentText>

          <Stepper activeStep={step} sx={{ mt: 3 }}>
            <Step>
              <StepLabel>
                <Trans>Choose</Trans>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Trans>Upload</Trans>
              </StepLabel>
            </Step>
            <Step>
              <StepLabel>
                <Trans>Complete</Trans>
              </StepLabel>
            </Step>
          </Stepper>

          <Box mt={3}>
            {step === 0 && file === undefined && (
              <Button
                variant="contained"
                component="label"
                sx={{ marginBottom: 1 }}
              >
                <Trans>Choose File</Trans>
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
            {step === 2 ? <Trans>Close</Trans> : <Trans>Cancel</Trans>}
          </Button>
          {step !== 2 && (
            <Button
              disabled={file === undefined || step !== 0}
              onClick={() => {
                upload!(file!, CampaignFormat.NewsDisplayAd);
              }}
              variant="contained"
            >
              <Trans>Upload</Trans>
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
}
