import React from "react";
import { PickerFields } from "./fields/PickerFields";
import { ConversionField } from "./fields/ConversionField";
import { Autocomplete, Checkbox, TextField } from "@mui/material";
import { useRecentlyCreatedAdvertiserCreatives } from "user/hooks/useAdvertiserCreatives";
import { CardContainer } from "components/Card/CardContainer";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import { useHistory } from "react-router-dom";
import { FormikTextField } from "form/FormikHelpers";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

interface Props {
  isEdit: boolean;
}

export function AdSetFields({ isEdit }: Props) {
  console.log("here");
  const history = useHistory();
  const creatives = useRecentlyCreatedAdvertiserCreatives();
  const params = new URLSearchParams(history.location.search);
  const current = Number(params.get("current") ?? 0);
  const fakeCurrent = current + 1;

  return (
    <>
      <CardContainer header={`Ad Set ${fakeCurrent}`}>
        <FormikTextField
          name={`adSets.${current}.name`}
          label="Ad Set Name"
          margin="none"
        />
      </CardContainer>

      <PickerFields index={current} />

      {!isEdit && <ConversionField index={current} />}

      <CardContainer header="Ads">
        <Autocomplete
          limitTags={5}
          multiple
          options={creatives}
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
              label="Select created Ads"
              // helperText={
              //   meta.error ??
              //   "Select the audience segments to target. Brave will decide if left untargeted."
              // }
              // error={!!meta.error}
            />
          )}
          isOptionEqualToValue={(option, value) => option.id === value.id}
          // value={meta.value}
          // onChange={(_ev, value) => {
          //   helper.setValue(_.sortBy(value, "name"));
          // }}
          // onBlur={() => helper.setTouched(true)}
        />
      </CardContainer>
    </>
  );
}
