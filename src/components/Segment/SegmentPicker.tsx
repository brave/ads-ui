import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import {SegmentFragment, useSegmentsQuery} from "../../graphql/common.generated";
import React from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  idx: number;
}

export const SegmentPicker: React.FC<Props> = ({ idx }: Props) => {
  const { data } = useSegmentsQuery();
  const activeSegments = _.sortBy(data?.segments?.data ?? [], (s) => s.name.toLowerCase());

  const [formProps, meta, helper] = useField<SegmentFragment[]>(`adSets.${idx}.segments`);
  const errorMessage = meta.error;

  return (
    <Autocomplete
      sx={{ mt: 3 }}
      multiple
      loading={activeSegments.length === 0}
      options={activeSegments}
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
          label="Audiences"
          helperText={errorMessage ?? "Select the audience segments to target"}
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
