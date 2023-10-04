import {
  ChangeEventHandler,
  HTMLInputTypeAttribute,
  PropsWithChildren,
  ReactNode,
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
}

export function extractErrors(errorObject: any): string[] {
  if (_.isNil(errorObject)) return [];

  return Object.values(errorObject).flatMap((o) =>
    _.isString(o) ? [o] : extractErrors(o),
  );
}

export const FormikSubmitButton = ({
  label = "Save",
  inProgressLabel = "Saving...",
  isCreate,
}: FormikSubmitButtonProps) => {
  const formik = useFormikContext();
  let saveButtonTooltip: TooltipProps["title"] = "";
  let saveEnabled = true;

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

export function useIsEdit() {
  const { values } = useFormikContext<CampaignForm>();
  const isEdit = values.id !== undefined && values.id.trim() !== "";
  const isDraft =
    (values.draftId !== undefined && values.draftId.trim() !== "") ||
    values.state === "draft";
  return { isEdit, isDraft };
}
