import { Box, Link, Paper, Slide } from "@mui/material";
import { PropsWithChildren, ReactNode, useState } from "react";
import { useFormikContext } from "formik";
import {
  extractErrors,
  FormikDialogButton,
  FormikSubmitButton,
} from "form/FormikButton";

function StatusMessage({
  errors,
  isDirty,
}: {
  errors: string[];
  isDirty: boolean;
}): ReactNode {
  const [showErrors, setShowErrors] = useState(false);

  if (errors.length === 0) {
    return isDirty ? "You have unsaved changes" : null;
  }

  if (errors.length === 1) {
    return errors[0];
  }

  return (
    <Box>
      <Link underline="hover" onClick={() => setShowErrors((state) => !state)}>
        You have {errors.length} errors that must be fixed before submitting.
      </Link>
      {showErrors && (
        <ul>
          {errors.map((v, idx) => (
            <li key={idx}>{`${v}`}</li>
          ))}
        </ul>
      )}
    </Box>
  );
}

interface Props {
  isCreate: boolean;
  useDialogue?: boolean;
  dialogTitle?: string;
  dialogMessage?: string;
}

export function SubmitPanel(props: PropsWithChildren<Props>) {
  const { dirty, errors, submitCount } = useFormikContext();
  // when creating a new item, we don't want to bombard with a whole load
  // of validation errors. So wait until it's been submitted at least once
  // before dumping the set of things that need to be completed.
  const errorStrings =
    props.isCreate && submitCount < 1 ? [] : extractErrors(errors);

  return (
    <Slide in={dirty} direction="up">
      <Paper
        elevation={8}
        sx={{
          p: 2,
          backgroundColor: "#eeeeee",
          position: "sticky",
          bottom: 0,
          zIndex: 9999,
        }}
      >
        <Box display="flex" justifyContent="flex-end" alignItems="end" gap={2}>
          <Box flex={1} alignSelf="center">
            <StatusMessage errors={errorStrings} isDirty={dirty} />
          </Box>

          {props.useDialogue && props.dialogTitle && props.dialogMessage && (
            <FormikDialogButton
              {...props}
              dialogMessage={props.dialogMessage}
              dialogTitle={props.dialogTitle}
            />
          )}
          {!props.useDialogue && <FormikSubmitButton {...props} />}
        </Box>
      </Paper>
    </Slide>
  );
}
