import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import {GeocodeFragment, useActiveGeocodesQuery} from "../../graphql/common.generated";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LocationPicker: React.FC<{
  countries?: boolean;
  states?: boolean;
}> = ({ countries = true, states = true }) => {
  const { data } = useActiveGeocodesQuery();
  const sorted = _.sortBy(data?.activeGeocodes?.data ?? [], "name");
  const activeLocations = sorted.filter((l) => {
    const isState = l.code.includes("-");
    const isCountry = !l.code.includes("-");
    let include = true;
    if (!states && isState) include = false;
    if (!countries && isCountry) include = false;
    return include;
  });
  const [formProps, meta, helper] = useField<GeocodeFragment[]>("geoTargets");
  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      limitTags={20}
      getLimitTagsText={(cnt) => `+${cnt} more`}
      multiple
      loading={activeLocations.length === 0}
      options={activeLocations}
      disableCloseOnSelect
      autoHighlight
      getOptionLabel={(option) => option.name}
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
          label="Location"
          helperText={
            errorMessage ??
            "Select the geographic regions where your ads will be shown"
          }
          error={!!errorMessage}
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
