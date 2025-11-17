import { useFormikContext } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  SxProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import _ from "lodash";
import { useState } from "react";

interface FormikSubmitButtonProps {
  label?: string;
  inProgressLabel?: string;
  isCreate: boolean;
  sx?: SxProps;
}

export function extractErrors(errorObject: any): string[] {
  if (_.isNil(errorObject)) return [];

  return Object.values(errorObject).flatMap((o) =>
    _.isString(o) ? [o] : extractErrors(o),
  );
}

const useSave = (props: { isCreate: boolean }) => {
  const formik = useFormikContext();
  let saveButtonTooltip: TooltipProps["title"] = "";
  let saveEnabled = true;

  if (formik.isSubmitting) {
    saveEnabled = false;
  } else if (!props.isCreate && !formik.dirty) {
    saveEnabled = false;
    saveButtonTooltip = "Disabled because you haven't made any changes";
  } else if (props.isCreate && formik.submitCount < 1) {
    // on create, initially enable the button so users can reveal all the required fields
    saveEnabled = true;
  } else if (!formik.isValid) {
    saveEnabled = false;
    saveButtonTooltip = (
      <>
        Disabled due to validation errors
        <ul>
          {extractErrors(formik.errors).map((v, idx) => (
            <li key={idx}>{`${v}`}</li>
          ))}
        </ul>
      </>
    );
  }

  return {
    saveButtonTooltip,
    saveEnabled,
    isSubmitting: formik.isSubmitting,
    submitForm: formik.submitForm,
  };
};

export const FormikSubmitButton = ({
  label = "Save",
  inProgressLabel = "Saving...",
  isCreate,
  sx,
}: FormikSubmitButtonProps) => {
  const { saveButtonTooltip, saveEnabled, isSubmitting, submitForm } = useSave({
    isCreate,
  });

  return (
    <Tooltip title={saveButtonTooltip}>
      <div>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            submitForm();
          }}
          size="large"
          disabled={!saveEnabled || isSubmitting}
          sx={sx}
        >
          {isSubmitting ? inProgressLabel : label}
        </Button>
      </div>
    </Tooltip>
  );
};

interface DialogProps {
  dialogTitle: string;
  dialogMessage: string;
}

export const FormikDialogButton = (
  props: FormikSubmitButtonProps & DialogProps,
) => {
  const { saveButtonTooltip, saveEnabled, isSubmitting } = useSave({
    isCreate: props.isCreate,
  });
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={saveButtonTooltip}>
        <div>
          <Button
            color="primary"
            variant="contained"
            size="large"
            onClick={(e) => {
              e.preventDefault();
              setOpen(true);
            }}
            disabled={!saveEnabled || isSubmitting || open}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>{props.dialogTitle}</DialogTitle>
        <DialogContent>{props.dialogMessage}</DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="large"
            sx={{ mr: 1 }}
          >
            Close
          </Button>
          <FormikSubmitButton {...props} />
        </DialogActions>
      </Dialog>
    </>
  );
};
