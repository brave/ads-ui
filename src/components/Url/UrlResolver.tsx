import {
  Alert,
  Box,
  TextField,
  InputAdornment,
  CircularProgress,
  AlertTitle,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import React, { useMemo, useEffect } from "react";
import _ from "lodash";
import { useField, useFormikContext } from "formik";
import { useValidateTargetUrlLazyQuery } from "../../graphql/url.generated";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { SimpleUrlRegexp } from "../../validation/CampaignSchema";
import { CampaignForm } from "../../user/views/adsManager/types";

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
  const [validateUrl, { loading, data, error }] =
    useValidateTargetUrlLazyQuery();
  const debouncedValidateUrl = useMemo(
    () =>
      _.debounce(
        (value: string) =>
          value &&
          !hasError &&
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
      debouncedValidateUrl(nameMeta.value);

      if (value !== !!data?.validateTargetUrl?.isValid) {
        setValue(!loading && !!data?.validateTargetUrl?.isValid, false);
      }

      const errors = data?.validateTargetUrl.errors ?? [];
      const currError = errors.join("#");
      if (errors.length > 0 && currError !== fieldError) {
        setError(errors.join("#"));
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
