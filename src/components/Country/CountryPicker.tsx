import { Autocomplete, Box, FormLabel, TextField } from "@mui/material";
import { useField } from "formik";
import React from "react";
import { useCountries } from "components/Country/useCountries";

interface Props {
  name: string;
}

export const CountryPicker: React.FC<Props> = ({ name }) => {
  const { data } = useCountries();

  const [formProps, meta, helper] = useField<string>(name);
  const errorMessage = meta.error;

  const value = data.find((c) => c.code === formProps.value) ?? null;

  return (
    <Autocomplete
      fullWidth
      autoSelect
      loading={data.length === 0}
      options={data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <Box>
          <FormLabel sx={{ color: "text.primary" }}>Country</FormLabel>
          <TextField
            {...params}
            helperText={meta.touched && errorMessage}
            error={meta.touched && !!errorMessage}
            placeholder="Country of residence"
            autoComplete="country"
          />
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      value={value}
      onChange={(_ev, value) => {
        helper.setValue(value ? value.code : "");
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
