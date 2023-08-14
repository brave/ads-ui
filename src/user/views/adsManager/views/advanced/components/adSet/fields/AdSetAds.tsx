import { CardContainer } from "components/Card/CardContainer";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useField } from "formik";
import { Creative } from "user/views/adsManager/types";
import _ from "lodash";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const creatives = useRecentlyCreatedAdvertiserCreatives();
  const [, meta, helper] = useField<Creative[]>(`adSets.${index}.creatives`);

  return (
    <CardContainer header="Ads">
      <Autocomplete
        multiple
        options={creatives}
        disableCloseOnSelect
        autoHighlight
        getOptionLabel={(option) => option.name}
        renderOption={(props, option, { selected }) => (
          <li {...props}>
            <Checkbox
              icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
              checkedIcon={<CheckBoxIcon fontSize="small" />}
              style={{ marginRight: 8 }}
              checked={selected}
            />
            {option.name}
          </li>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Select Ads"
            helperText={meta.error ?? "Select the ads for this ad set."}
            error={meta.touched && !!meta.error}
          />
        )}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        value={meta.value}
        onChange={(_ev, value) => {
          helper.setValue(_.sortBy(value, "name"));
        }}
        onBlur={() => helper.setTouched(true)}
      />
    </CardContainer>
  );
}
