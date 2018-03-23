import { TextField } from "material-ui";
import * as React from "react";

export const renderTextField = ({
  input,
  label,
  meta,
  type,
  ...custom,
}: any) => (
    <TextField
      label={label}
      error={meta.touched && meta.invalid}
      type={type}
      helperText={meta.touched && meta.error}
      {...input}
      {...custom}
    />
  );
