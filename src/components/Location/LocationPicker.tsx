import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import { useActiveGeocodesQuery } from "graphql/common.generated";
import { GeocodeInput } from "graphql/types";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LocationPicker = () => {
  const { data } = useActiveGeocodesQuery();
  const sorted = _.sortBy(data?.activeGeocodes?.data ?? [], "code");
  const [formProps, meta, helper] = useField<GeocodeInput[]>("geoTargets");
  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      limitTags={20}
      getLimitTagsText={(cnt) => `+${cnt} more`}
      multiple
      loading={sorted.length === 0}
      options={sorted}
      disableCloseOnSelect
      autoHighlight
      getOptionLabel={(option) => option.name ?? option.code}
      renderOption={(props, option, { selected }) => (
        <li {...props}>
          <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
          />
          {option.name}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Country Targeting"
          helperText={
            meta.touched && !!errorMessage
              ? errorMessage
              : "Select the geographic regions where your ads will be shown."
          }
          error={!!errorMessage && meta.touched}
        />
      )}
      isOptionEqualToValue={(option, value) => option.code === value.code}
      value={formProps.value}
      onChange={(_ev, value) => {
        void helper.setValue(_.sortBy(value, "name"));
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
