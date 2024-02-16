import { Autocomplete, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

interface PlatformLookup {
  code: string;
  name: string;
}

interface Props {
  idx: number;
}

export const PlatformPicker = ({ idx }: Props) => {
  const { _: lingui } = useLingui();
  const [formProps, meta, helper] = useField<PlatformLookup[]>({
    name: `adSets.${idx}.oses`,
  });

  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 3 }}
      multiple
      options={[
        { code: "i1g4cO6Pl", name: "windows" },
        { code: "_Bt5nxrNo", name: "macos" },
        { code: "-Ug5OXisJ", name: "linux" },
        { code: "k80syyzDa", name: "ios" },
        { code: "mbwfZU-4W", name: "android" },
      ]}
      disableCloseOnSelect
      autoHighlight
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={lingui(msg`Platforms`)}
          helperText={
            meta.touched && !!errorMessage
              ? errorMessage
              : lingui(msg`Select the platforms to target`)
          }
          error={meta.touched && !!errorMessage}
        />
      )}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      value={formProps.value}
      onChange={(_ev, value) => {
        helper.setValue(_.sortBy(value, "name"));
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
