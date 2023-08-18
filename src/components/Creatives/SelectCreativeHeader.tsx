import { CreativeFragment } from "graphql/creative.generated";
import { useField, useFormikContext } from "formik";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Box, IconButton, Tooltip } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";

export const SelectCreativeHeader = (props: {
  creative: CreativeFragment;
  fieldName: string;
}) => {
  const { values } = useFormikContext<CampaignForm>();
  const { advertiser } = useAdvertiser();
  const [, meta, helpers] = useField<Creative[]>(props.fieldName);
  const [selected, setSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const onSelectCreative = (
    c: CreativeFragment,
    v: Creative[] | undefined,
    selected: boolean,
  ) => {
    let value;
    if (selected) {
      value = [...(v ?? []), c];
    } else {
      value = _.filter(v ?? [], (n) => n.id !== c.id);
    }
    const mapped = value.map((d) => ({ advertiserId: advertiser.id, ...d }));
    helpers.setValue(mapped);
  };

  useEffect(() => {
    setSelected(
      (meta.value ?? []).find((c) => c.id === props.creative.id) !== undefined,
    );
    setDisabled(
      props.fieldName === "creatives" &&
        _.flatMap(values.adSets, "creatives").some(
          (v) => v.id === props.creative.id,
        ),
    );
  }, [meta.value]);

  return (
    <Box display="flex" justifyContent="space-between" alignItems="center">
      {props.creative.name}
      <Tooltip
        title={
          disabled
            ? "Unable to remove an ad that is currently part of an ad set"
            : null
        }
      >
        <span>
          <IconButton
            onClick={() => {
              const s = !selected;
              setSelected(s);
              onSelectCreative(props.creative, meta.value, s);
            }}
            sx={{ p: 0 }}
            disabled={disabled}
          >
            {selected ? (
              <CheckBoxIcon
                color={disabled ? "disabled" : "primary"}
                fontSize="small"
              />
            ) : (
              <CheckBoxOutlineBlankIcon fontSize="small" />
            )}
          </IconButton>
        </span>
      </Tooltip>
    </Box>
  );
};
