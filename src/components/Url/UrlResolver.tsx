import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import _ from "lodash";
import { useField } from "formik";
import { UrlValidationResult, useUrlValidation } from "./use-url-validation";

interface Props {
  name: string;
  validator: string;
  label: string;
  disabled?: boolean;
  helperText?: string;
}

interface ValidationDetail {
  summary: string;
  detail: string;
}

function extractViolations(
  result: UrlValidationResult | undefined,
): ValidationDetail[] {
  return _.uniqBy(
    (result?.response?.redirects ?? []).flatMap((r) => r.violations),
    "summary",
  );
}

export const UrlResolver = ({
  name,
  validator,
  label,
  disabled = false,
  helperText,
}: Props) => {
  const [nameField, nameMeta] = useField(name);
  const [, , isValidHelper] = useField(validator);
  const hasError = Boolean(nameMeta.error);
  const showError = hasError && nameMeta.touched;
  const isDirty = !_.isEqual(nameMeta.value, nameMeta.initialValue);

  const urlValidation = useUrlValidation(nameField?.value ?? "");
  const { isValid } = urlValidation;

  useEffect(() => {
    if (isDirty) {
      const val = isValid !== true ? "Target URL is not valid" : undefined;
      isValidHelper.setValue(val, isValid === true);
    }
  }, [isValid, isDirty, isValidHelper]);

  const urlViolations = extractViolations(urlValidation);
  return (
    <>
      <TextField
        variant="outlined"
        label={label}
        margin="normal"
        fullWidth
        error={showError}
        helperText={showError ? nameMeta.error : helperText}
        color="secondary"
        autoComplete="off"
        disabled={disabled}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              {urlValidation.validating && <CircularProgress />}
            </InputAdornment>
          ),
        }}
        {...nameField}
      />
      <Box mt={2}>
        {urlValidation.validating && (
          <Alert
            icon={<CircularProgress size={20} color="secondary" />}
            severity="info"
          >
            Validating URL...
          </Alert>
        )}

        {urlValidation.isValid && (
          <Alert severity="success" sx={{ mb: 1 }}>
            URL is valid.
          </Alert>
        )}

        {urlViolations.map((e, idx) => (
          <Alert severity="error" sx={{ mb: 1 }} key={idx}>
            <AlertTitle>{e.summary}</AlertTitle>
            {e.detail}
          </Alert>
        ))}
      </Box>
    </>
  );
};
