import {
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
  useEffect,
} from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  TextFieldProps,
  Tooltip,
  TooltipProps,
} from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import { useHistory } from "react-router-dom";
import _ from "lodash";

type FormikTextFieldProps = TextFieldProps & {
  name: string;
  label: string;
  maxLengthInstantFeedback?: number;
  helperText?: ReactNode;
  small?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  useTopLabel?: boolean;
};

export const FormikTextField = (props: FormikTextFieldProps) => {
  const [field, meta] = useField(props.name);
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;

  let helperText = props.helperText;

  if (props.maxLengthInstantFeedback) {
    const len = meta?.value?.length ?? 0;
    helperText = `${len}/${props.maxLengthInstantFeedback} characters`;
  }

  const extraOmit = props.useTopLabel ? ["label"] : [];
  return (
    <Box flexGrow={1}>
      {props.useTopLabel && (
        <FormLabel sx={{ color: "text.primary" }}> {props.label} </FormLabel>
      )}
      <TextField
        variant="outlined"
        fullWidth={!props.small}
        margin="normal"
        error={showError}
        helperText={showError ? meta.error : helperText}
        color="secondary"
        autoComplete="off"
        placeholder={
          props.useTopLabel && !props.placeholder
            ? props.label
            : props.placeholder
        }
        sx={props.useTopLabel ? { marginBottom: 2 } : {}}
        disabled={props.disabled}
        inputProps={{
          maxLength: props.maxLengthInstantFeedback,
        }}
        {..._.omit(props, [
          "small",
          "maxLengthInstantFeedback",
          "helperText",
          ...extraOmit,
        ])}
        {...field}
      />
    </Box>
  );
};

interface FormikSwitchProps {
  name: string;
  label: string;
}

export const FormikSwitch = (props: FormikSwitchProps) => {
  const [field] = useField({ type: "checkbox", name: props.name });
  return (
    <>
      <FormControlLabel control={<Switch {...field} />} label={props.label} />
      <ErrorMessage name={field.name}>
        {(msg: string) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikRadioGroupProps {
  name: string;
  row?: boolean;
}

export const FormikRadioGroup = (
  props: PropsWithChildren<FormikRadioGroupProps>,
) => {
  const [field] = useField(props);
  return (
    <>
      <RadioGroup {...props} {...field} />
      <ErrorMessage name={field.name}>
        {(msg: string) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikRadioControlProps {
  name: string;
  options: Array<{ label: string; value: string | number }>;
  label?: string;
  helperText?: ReactNode;
  disabled?: boolean;
}

export const FormikRadioControl = (props: FormikRadioControlProps) => {
  return (
    <FormControl
      component="fieldset"
      margin="normal"
      disabled={props.disabled === true}
    >
      <FormLabel component="legend" color="secondary">
        {props.label}
      </FormLabel>
      <FormikRadioGroup row name={props.name}>
        {props.options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            label={opt.label}
            control={<Radio />}
          />
        ))}
      </FormikRadioGroup>

      {props.helperText && (
        <FormHelperText sx={{ mt: 0 }}>{props.helperText}</FormHelperText>
      )}
    </FormControl>
  );
};

interface FormikSubmitButtonProps {
  label?: string;
  inProgressLabel?: string;
  isCreate: boolean;
  allowNavigation?: boolean;
}

function extractErrors(errorObject: any): string[] {
  return Object.values(errorObject)
    .filter((v) => !!v)
    .flatMap((o) => (_.isString(o) ? [o] : extractErrors(o)));
}

export const FormikSubmitButton = ({
  label = "Save",
  inProgressLabel = "Saving...",
  isCreate,
  allowNavigation,
}: FormikSubmitButtonProps) => {
  const formik = useFormikContext();
  const history = useHistory();

  let saveButtonTooltip: TooltipProps["title"] = "";
  let saveEnabled = true;

  // On create, the save button is initially enabled so the user can click it
  // to see the full set of validation errors.
  // On edit, it should only be enabled once they've made changes.
  useEffect(() => {
    const unblock = history.block(
      !allowNavigation && formik.dirty
        ? "You’ve got unsaved changes. Are you sure you want to navigate away from this page?"
        : true,
    );

    return function cleanup() {
      unblock();
    };
  }, [formik.dirty, allowNavigation]);

  if (formik.isSubmitting) {
    saveEnabled = false;
  } else if (!isCreate && !formik.dirty) {
    saveEnabled = false;
    saveButtonTooltip = "Disabled because you haven’t made any changes";
  } else if (isCreate && formik.submitCount < 1) {
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

  return (
    <Tooltip title={saveButtonTooltip}>
      <div>
        <Button
          color="primary"
          variant="contained"
          type="submit"
          size="large"
          disabled={!saveEnabled || formik.isSubmitting}
        >
          {formik.isSubmitting ? inProgressLabel : label}
        </Button>
      </div>
    </Tooltip>
  );
};
