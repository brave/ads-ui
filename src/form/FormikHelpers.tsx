import React, { HTMLInputTypeAttribute, useEffect } from "react";
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Switch,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
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
  helperText?: React.ReactNode;
  small?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
};

export const FormikTextField: React.FC<FormikTextFieldProps> = (props) => {
  const [field, meta] = useField(props.name);
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;

  let helperText = props.helperText;

  if (props.maxLengthInstantFeedback) {
    const len = meta?.value?.length ?? 0;
    helperText = `${len}/${props.maxLengthInstantFeedback} characters`;
  }

  return (
    <TextField
      variant="outlined"
      fullWidth={!props.small}
      margin="normal"
      error={showError}
      helperText={showError ? meta.error : helperText}
      color="secondary"
      autoComplete="off"
      disabled={props.disabled}
      {..._.omit(props, ["small", "maxLengthInstantFeedback", "helperText"])}
      {...field}
    />
  );
};

interface FormikSelectProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  disabled?: boolean;
  sx?: SxProps<Theme> | undefined;
  margin?: "normal" | "dense" | "none" | undefined;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  variant?: "outlined" | "standard" | "filled" | undefined;
}

export const FormikSelect: React.FC<FormikSelectProps> = (props) => {
  const [field, meta] = useField(props);
  return (
    <FormControl fullWidth={props.sx === undefined} {...props}>
      <InputLabel id={`select-label-${props.name}`}>{props.label}</InputLabel>
      <Select
        error={meta.touched && Boolean(meta.error)}
        label={props.label}
        {...field}
      >
        {props.options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </FormControl>
  );
};

interface FormikRadioGroupProps {
  name: string;
  row?: boolean;
}

export const FormikRadioGroup: React.FC<FormikRadioGroupProps> = (props) => {
  const [field] = useField(props);
  return (
    <>
      <RadioGroup {...props} {...field} />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikRadioControlProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string | number }>;
  helperText?: React.ReactNode;
}

export const FormikRadioControl: React.FC<FormikRadioControlProps> = (
  props
) => {
  return (
    <FormControl component="fieldset" margin="normal">
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

      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
    </FormControl>
  );
};

interface FormikSwitchProps {
  name: string;
  label: string;
}

export const FormikSwitch: React.FC<FormikSwitchProps> = (props) => {
  const [field] = useField({ type: "checkbox", name: props.name });
  return (
    <>
      <FormControlLabel control={<Switch {...field} />} label={props.label} />
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikCheckboxProps {
  name: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
}

export const FormikCheckbox: React.FC<FormikCheckboxProps> = (props) => {
  const [field] = useField({ type: "checkbox", name: props.name });
  return (
    <>
      <FormControlLabel
        control={<Checkbox {...field} />}
        label={props.label}
        componentsProps={{ typography: { variant: "body2" } }}
        disabled={props.disabled}
      />
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
      <ErrorMessage name={field.name}>
        {(msg) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikSubmitButtonProps {
  label?: string;
  inProgressLabel?: String;
  isCreate: boolean;
  allowNavigation?: boolean;
}

function extractErrors(errorObject: any): string[] {
  // @ts-ignore
  return Object.values(errorObject).flatMap((o) =>
    _.isString(o) ? [o] : extractErrors(o)
  );
}

export const FormikSubmitButton: React.FC<FormikSubmitButtonProps> = ({
  label = "Save",
  inProgressLabel = "Saving...",
  isCreate,
  allowNavigation,
}) => {
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
        : true
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
          disabled={!saveEnabled}
        >
          {formik.isSubmitting ? inProgressLabel : label}
        </Button>
      </div>
    </Tooltip>
  );
};