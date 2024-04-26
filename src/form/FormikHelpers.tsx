import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormControlOwnProps,
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
} from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import _ from "lodash";
import { CampaignForm } from "@/user/views/adsManager/types";
import { Trans } from "@lingui/macro";
import { TypographyOwnProps } from "@mui/material/Typography";

type FormikTextFieldProps = TextFieldProps & {
  name: string;
  label: string;
  maxLengthInstantFeedback?: number;
  helperText?: ReactNode;
  small?: boolean;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  growInput?: boolean;
  inlineError?: boolean;
};

export const FormikTextField = (props: FormikTextFieldProps) => {
  const [field, meta] = useField(props.name);
  const hasError = Boolean(meta.error);
  const showError = hasError && meta.touched;

  let helperText = props.helperText;

  if (props.maxLengthInstantFeedback) {
    const length = meta?.value?.length ?? 0;
    const maxLength = props.maxLengthInstantFeedback;
    helperText = (
      <Trans>
        {length}/{maxLength} characters
      </Trans>
    );
  }

  return (
    <TextField
      variant="outlined"
      fullWidth={!props.small}
      margin="normal"
      error={showError}
      helperText={showError && !props.inlineError ? meta.error : helperText}
      color="secondary"
      placeholder={props.placeholder ?? props.label}
      label={showError && props.inlineError ? meta.error : props.label}
      disabled={props.disabled}
      inputProps={{
        maxLength: props.maxLengthInstantFeedback,
      }}
      {..._.omit(props, [
        "small",
        "maxLengthInstantFeedback",
        "helperText",
        "label",
      ])}
      {...field}
    />
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
        {(message: string) => <FormHelperText error>{message}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikRadioGroupProps {
  name: string;
  row?: boolean;
  onChange?: ChangeEventHandler<any>;
}

export const FormikRadioGroup = (
  props: PropsWithChildren<FormikRadioGroupProps>,
) => {
  const [field, meta, helper] = useField(props);
  return (
    <>
      <RadioGroup
        {...props}
        {...field}
        value={meta.value}
        onChange={(e, nv) => {
          helper.setValue(nv);
          if (props.onChange) props.onChange(e);
        }}
      />
      <ErrorMessage name={field.name}>
        {(message: string) => <FormHelperText error>{message}</FormHelperText>}
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
  onChange?: ChangeEventHandler<any>;
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
      <FormikRadioGroup row name={props.name} onChange={props.onChange}>
        {props.options.map((opt, idx) => (
          <FormControlLabel
            key={`${props.name}_radio_${idx}`}
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

interface FormikCheckboxProps {
  name: string;
  label: ReactNode;
  disabled?: boolean;
  helperText?: string;
  showErrorMessage?: boolean;
  sx?: SxProps<Theme>;
  labelVariant?: TypographyOwnProps["variant"];
}

export function FormikCheckbox(props: FormikCheckboxProps) {
  const [field] = useField({ type: "checkbox", name: props.name });
  return (
    <>
      <FormControlLabel
        control={<Checkbox {...field} />}
        label={props.label}
        componentsProps={{
          typography: { variant: props.labelVariant ?? "body2" },
        }}
        disabled={props.disabled}
        sx={props.sx}
      />
      {props.helperText && <FormHelperText>{props.helperText}</FormHelperText>}
      {props.showErrorMessage !== false && (
        <ErrorMessage name={field.name}>
          {(msg: any) => <FormHelperText error>{msg}</FormHelperText>}
        </ErrorMessage>
      )}
    </>
  );
}

export function useIsEdit() {
  const { values } = useFormikContext<CampaignForm>();
  const isEdit = values.id !== undefined && values.id.trim() !== "";
  const isDraft =
    (values.draftId !== undefined && values.draftId.trim() !== "") ||
    values.state === "draft";
  return { isEdit, isDraft };
}

interface FormikSelectProps {
  name: string;
  label: string;
  options: Array<{ label: string; value: string }>;
  disabled?: boolean;
  sx?: SxProps<Theme> | undefined;
  margin?: "normal" | "dense" | "none" | undefined;
  fullWidth?: boolean;
  color?:
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined;
  variant?: "outlined" | "standard" | "filled" | undefined;
  size?: FormControlOwnProps["size"];
  inlineError?: boolean;
}

export const FormikSelect = (props: FormikSelectProps) => {
  const [field, meta] = useField(props);
  const isError = meta.touched && Boolean(meta.error);
  const labelOrError = props.inlineError && isError ? meta.error : props.label;
  return (
    <FormControl
      fullWidth={props.fullWidth !== undefined ? props.fullWidth : true}
      {...props}
    >
      <InputLabel id={`select-label-${props.name}`}>{labelOrError}</InputLabel>
      <Select error={isError} label={labelOrError} {...field}>
        {props.options.map((opt) => (
          <MenuItem key={opt.value} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      {!props.inlineError && (
        <ErrorMessage name={field.name}>
          {(msg: any) => <FormHelperText error>{msg}</FormHelperText>}
        </ErrorMessage>
      )}
    </FormControl>
  );
};
