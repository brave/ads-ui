import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
} from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
  Switch,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { ErrorMessage, useField, useFormikContext } from "formik";
import _ from "lodash";
import { CampaignForm } from "user/views/adsManager/types";

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
        {(msg: string) => <FormHelperText error>{msg}</FormHelperText>}
      </ErrorMessage>
    </>
  );
};

interface FormikRadioControlProps {
  name: string;
  options: Array<{ label: string; value: string | number; disabled?: boolean }>;
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
        {props.options.map((opt) => (
          <FormControlLabel
            key={opt.value}
            value={opt.value}
            label={opt.label}
            disabled={opt.disabled}
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

export function useIsEdit() {
  const { values } = useFormikContext<CampaignForm>();
  const isEdit = values.id !== undefined && values.id.trim() !== "";
  const isDraft =
    (values.draftId !== undefined && values.draftId.trim() !== "") ||
    values.state === "draft";
  return { isEdit, isDraft };
}
