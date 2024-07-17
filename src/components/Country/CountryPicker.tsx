import { Autocomplete, Box, TextField } from "@mui/material";
import { useField } from "formik";
import { useCountries } from "@/components/Country/useCountries";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface Props {
  name: string;
  label?: string;
  filter?: string[];
}

export const CountryPicker = ({ name, filter, label }: Props) => {
  const { data } = useCountries();
  const { _ } = useLingui();

  const [formProps, meta, helper] = useField<string>(name);
  const errorMessage = meta.error;

  const value = data.find((c) => c.code === formProps.value) ?? null;

  const isError = meta.touched && !!errorMessage;
  return (
    <Autocomplete
      autoSelect
      loading={data.length === 0}
      options={filter ? data.filter((c) => filter.includes(c.code)) : data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <Box>
          <TextField
            {...params}
            label={isError ? errorMessage : (label ?? _(msg`Country`))}
            error={isError}
            autoComplete="country"
            margin="dense"
            size="small"
          />
        </Box>
      )}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      value={value}
      onChange={async (_ev, value) => {
        await helper.setValue(value ? value.code : "");
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
