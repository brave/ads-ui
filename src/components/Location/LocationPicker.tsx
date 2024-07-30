import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import { ActiveGeocodesDocument, GeocodeInput } from "@/graphql-client/graphql";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";
import { useQuery } from "@apollo/client";
import { useIsEdit } from "@/form/FormikHelpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

export const LocationPicker = () => {
  const { isDraft } = useIsEdit();
  const { data } = useQuery(ActiveGeocodesDocument, { skip: !isDraft });
  const sorted = _.sortBy(
    (data?.geocodes ?? []).filter((c) => c.code !== "OTHER"),
    "code",
  );
  const [formProps, meta, helper] = useField<GeocodeInput[]>("geoTargets");
  const errorMessage = meta.error;
  const { _: lingui } = useLingui();

  return (
    <Autocomplete
      sx={{ mt: 2 }}
      disabled={!isDraft}
      limitTags={20}
      getLimitTagsText={(count) => <Trans>+{count} more</Trans>}
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
          label={lingui(msg`Country Targeting`)}
          helperText={
            meta.touched && !!errorMessage
              ? errorMessage
              : lingui(
                  msg`Select the geographic regions where your ads will be shown.`,
                )
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
