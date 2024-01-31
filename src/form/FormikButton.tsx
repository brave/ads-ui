import { useFormikContext } from "formik";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import _ from "lodash";
import { useState } from "react";
import { MessageDescriptor } from "@lingui/core";
import { msg, Trans } from "@lingui/macro";
import { Trans as TransWithId } from "@lingui/react";

interface FormikSubmitButtonProps {
  label?: MessageDescriptor;
  inProgressLabel?: MessageDescriptor;
  isCreate: boolean;
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
    saveButtonTooltip = (
      <Trans>Disabled because you haven’t made any changes</Trans>
    );
  } else if (props.isCreate && formik.submitCount < 1) {
    // on create, initially enable the button so users can reveal all the required fields
    saveEnabled = true;
  } else if (!formik.isValid) {
    saveEnabled = false;
    saveButtonTooltip = (
      <>
        <Trans>Disabled due to validation errors</Trans>
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
  label = msg`Save`,
  inProgressLabel = msg`Saving...`,
  isCreate,
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
        >
          {isSubmitting ? (
            <TransWithId id={inProgressLabel.id} />
          ) : (
            <TransWithId id={label.id} />
          )}
        </Button>
      </div>
    </Tooltip>
  );
};

interface DialogProps {
  dialogTitle: MessageDescriptor;
  dialogMessage: MessageDescriptor;
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
            {isSubmitting ? <Trans>Saving...</Trans> : <Trans>Save</Trans>}
          </Button>
        </div>
      </Tooltip>
      <Dialog open={open}>
        <DialogTitle>
          <TransWithId id={props.dialogTitle.id} />
        </DialogTitle>
        <DialogContent>
          <TransWithId id={props.dialogMessage.id} />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpen(false)}
            variant="outlined"
            size="large"
            sx={{ mr: 1 }}
          >
            <Trans>Close</Trans>
          </Button>
          <FormikSubmitButton {...props} />
        </DialogActions>
      </Dialog>
    </>
  );
};
