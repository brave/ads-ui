import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  InputAdornment,
  TextField,
} from "@mui/material";
import React, { useEffect, useMemo } from "react";
import _ from "lodash";
import { useField } from "formik";
import { useValidateTargetUrlLazyQuery } from "graphql/url.generated";
import { SimpleUrlRegexp } from "validation/CampaignSchema";

interface Props {
  name: string;
  validator: string;
  label?: string;
  disabled?: boolean;
  helperText?: string;
}

export const UrlResolver: React.FC<Props> = ({
  name,
  validator,
  label = "Website URL",
  disabled = false,
  helperText,
}) => {
  const [nameField, nameMeta] = useField(name);
  const [, isValidMeta, isValidHelper] = useField(validator);
  const hasError = Boolean(nameMeta.error);
  const showError = hasError && nameMeta.touched;
  const [validateUrl, { loading, data }] = useValidateTargetUrlLazyQuery();
  const debouncedValidateUrl = useMemo(
    () =>
      _.debounce(
        (value: string, err?: string) =>
          value &&
          err == null &&
          SimpleUrlRegexp.test(value) &&
          validateUrl({
            variables: {
              url: value,
            },
          }),
        500
      ),
    []
  );

  const { value, error: fieldError } = isValidMeta;
  const { setValue, setError } = isValidHelper;

  useEffect(() => {
    if (!disabled) {
      debouncedValidateUrl.cancel();
      debouncedValidateUrl(nameMeta.value, nameMeta.error);

      if (value !== !!data?.validateTargetUrl?.isValid) {
        setValue(!loading && !!data?.validateTargetUrl?.isValid, false);
      }

      const errors = data?.validateTargetUrl.errors ?? [];
      const currError = errors.join("#");
      if (errors.length > 0 && currError !== fieldError) {
        setError(currError);
      }
    }
  });

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
              {loading && <CircularProgress />}
            </InputAdornment>
          ),
        }}
        {...nameField}
      />
      {loading && (
        <Alert
          icon={<CircularProgress size={20} color="secondary" />}
          severity="info"
        >
          Validating URL...
        </Alert>
      )}

      {!!data && (
        <Box mt={2}>
          {!data.validateTargetUrl.isValid ? (
            <>
              {data.validateTargetUrl.errors.map((e) => (
                <Alert severity="error" sx={{ mb: 1 }}>
                  <AlertTitle>URL Error</AlertTitle>
                  {e}
                </Alert>
              ))}
            </>
          ) : (
            <Alert severity="success" sx={{ mb: 1 }}>
              URL is valid.
            </Alert>
          )}
        </Box>
      )}
    </>
  );
};
