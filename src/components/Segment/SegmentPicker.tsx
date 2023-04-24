import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { Autocomplete, Box, Checkbox, TextField } from "@mui/material";
import { useField } from "formik";
import _ from "lodash";
import { SegmentFragment, useSegmentsQuery } from "graphql/common.generated";
import React, { useEffect } from "react";
import { FormikSwitch } from "form/FormikHelpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  idx: number;
}

export const SegmentPicker: React.FC<Props> = ({ idx }: Props) => {
  const { data } = useSegmentsQuery();
  const activeSegments = _.sortBy(data?.segments?.data ?? [], (s) =>
    s.name.toLowerCase()
  );

  const [, targetMeta] = useField<boolean>(`adSets.${idx}.isNotTargeting`);

  const [, meta, helper] = useField<SegmentFragment[]>(
    `adSets.${idx}.segments`
  );

  useEffect(() => {
    if (targetMeta.value) {
      helper.setValue([{ code: "Svp7l-zGN", name: "untargeted" }]);
    } else {
      const onlyUntargeted =
        meta.value.length === 1 && meta.value[0].code === "Svp7l-zGN";
      helper.setValue(onlyUntargeted ? [] : meta.value);
    }
  }, [targetMeta.value]);

  return (
    <Box>
      <Box marginTop={3} marginLeft={1}>
        <FormikSwitch
          name={`adSets.${idx}.isNotTargeting`}
          label="Let Brave determine the best audience for your Campaign."
        />
      </Box>
      {!targetMeta.value && (
        <Autocomplete
          sx={{ mt: 3 }}
          limitTags={5}
          multiple
          loading={activeSegments.length === 0}
          options={activeSegments}
          disableCloseOnSelect
          autoHighlight
          groupBy={(option) => option.name.split("-")[0]}
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
              helperText={
                meta.error ??
                "Select the audience segments to target. Brave will decide if left untargeted."
              }
              error={!!meta.error}
            />
          )}
          isOptionEqualToValue={(option, value) => option.code === value.code}
          value={meta.value}
          onChange={(_ev, value) => {
            helper.setValue(_.sortBy(value, "name"));
          }}
          onBlur={() => helper.setTouched(true)}
        />
      )}
    </Box>
  );
};
