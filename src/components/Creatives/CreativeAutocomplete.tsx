import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  TextField,
  Typography,
} from "@mui/material";
import { CreativeFragment } from "graphql/creative.generated";
import { uiTextForCreativeTypeCode } from "user/library";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import moment from "moment";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import _ from "lodash";
import { useEffect, useState } from "react";

interface CreativeAutocompleteProps {
  label: string;
  options: readonly CreativeFragment[];
  alreadyAssociatedCreativeIds: string[];
  onSetValue: () => void;
}

export function CreativeAutocomplete(params: CreativeAutocompleteProps) {
  const { setFieldValue } = useFormikContext<CampaignForm>();
  const label = params.label;
  const [alreadyAdded, setAlreadyAdded] = useState<string[]>([]);

  useEffect(() => {
    setAlreadyAdded(params.alreadyAssociatedCreativeIds);
  }, [params.alreadyAssociatedCreativeIds]);

  return (
    <Box display="flex" flexDirection="column">
      <Autocomplete
        fullWidth
        multiple
        color="secondary"
        autoComplete
        disableCloseOnSelect
        options={params.options}
        onChange={async (_ev, value) => {
          const mapped = value.map((c) => c.id);
          setAlreadyAdded(mapped);
          await setFieldValue("creatives", _.uniq(mapped));
        }}
        value={params.options.filter((o) => alreadyAdded.includes(o.id))}
        renderInput={(params) => (
          <TextField
            variant="outlined"
            margin="normal"
            label={label}
            {...params}
          />
        )}
        renderOption={(props, option, { selected }) => {
          return (
            <li {...props}>
              <Checkbox
                icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
                checkedIcon={<CheckBoxIcon fontSize="small" />}
                style={{ marginRight: 8 }}
                checked={
                  selected ||
                  params.alreadyAssociatedCreativeIds.includes(option?.id)
                }
              />
              {option.name}
              <Typography variant="caption" marginLeft={1} color="GrayText">
                created {moment(option.createdAt).fromNow()}
              </Typography>
            </li>
          );
        }}
        getOptionLabel={(opt) => opt?.name ?? ""}
        getOptionDisabled={(opt) =>
          params.alreadyAssociatedCreativeIds.includes(opt?.id)
        }
        groupBy={(opt) => uiTextForCreativeTypeCode(opt.type)}
      />
      <Button
        size="large"
        variant="contained"
        sx={{ maxWidth: "165px", alignSelf: "end" }}
        onClick={async (e) => {
          e.preventDefault();
          params.onSetValue();
        }}
      >
        Close
      </Button>
    </Box>
  );
}
