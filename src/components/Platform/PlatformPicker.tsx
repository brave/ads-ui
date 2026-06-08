import { OperatingSystem } from "@/graphql-client/graphql";
import { Autocomplete, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";

interface Props {
  idx: number;
}

export const PlatformPicker = ({ idx }: Props) => {
  const [formProps, meta, helper] = useField<OperatingSystem[]>({
    name: `adSets.${idx}.operatingSystems`,
  });

  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 3 }}
      multiple
      options={[
        OperatingSystem.Windows,
        OperatingSystem.Macos,
        OperatingSystem.Linux,
        OperatingSystem.Ios,
        OperatingSystem.Android,
      ]}
      disableCloseOnSelect
      autoHighlight
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField
          {...params}
          label={"Platforms"}
          helperText={
            meta.touched && !!errorMessage
              ? errorMessage
              : "Select the platforms to target"
          }
          error={meta.touched && !!errorMessage}
        />
      )}
      isOptionEqualToValue={(option, value) => option === value}
      value={formProps.value}
      onChange={(_ev, value) => {
        helper.setValue(_.sortBy(value));
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
