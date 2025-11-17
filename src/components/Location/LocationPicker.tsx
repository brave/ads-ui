import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import { ActiveGeocodesDocument, GeocodeInput } from "@/graphql-client/graphql";
import { useQuery } from "@apollo/client";
import { useIsEdit } from "@/form/FormikHelpers";
import { useMemo } from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LocationPicker = () => {
  const { isDraft } = useIsEdit();
  const { data } = useQuery(ActiveGeocodesDocument, { skip: !isDraft });
  const sorted = useMemo(
    () =>
      _.sortBy(
        (data?.geocodes ?? []).filter(
          (c) => c.code !== "OTHER" && c.code !== "JP",
        ),
        "name",
      ),
    [data],
  );
  const [formProps, meta, helper] = useField<GeocodeInput[]>("geoTargets");
  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      disabled={!isDraft}
      limitTags={20}
      getLimitTagsText={(count) => `+${count} more`}
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
          label={"Country Targeting"}
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
        helper.setValue(_.sortBy(value, "name"));
      }}
      onBlur={() => helper.setTouched(true)}
    />
  );
};
