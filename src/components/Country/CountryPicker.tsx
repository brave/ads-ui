import { Autocomplete, Box, TextField } from "@mui/material";
import { useField } from "formik";
import { useCountries } from "components/Country/useCountries";

interface Props {
  name: string;
}

export const CountryPicker = ({ name }: Props) => {
  const { data } = useCountries();

  const [formProps, meta, helper] = useField<string>(name);
  const errorMessage = meta.error;

  const value = data.find((c) => c.code === formProps.value) ?? null;

  return (
    <Autocomplete
      sx={{ width: { md: "75%" } }}
      autoSelect
      loading={data.length === 0}
      options={data}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <Box>
          <TextField
            {...params}
            label="Country"
            helperText={meta.touched && errorMessage}
            error={meta.touched && !!errorMessage}
            autoComplete="country"
            margin="dense"
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
