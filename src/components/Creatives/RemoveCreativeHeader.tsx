import { useField, useFormikContext } from "formik";
import { CampaignForm, Creative } from "user/views/adsManager/types";
import { useEffect, useState } from "react";
import _ from "lodash";
import { Box, IconButton, Tooltip } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { Status } from "components/Campaigns/Status";

export const RemoveCreativeHeader = (props: { creative: Creative }) => {
  const { values } = useFormikContext<CampaignForm>();
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const adSetCreatives = _.flatMap(values.adSets, "creatives");
    setDisabled(
      _.find(adSetCreatives, (c) => c.id === props.creative.id) !== undefined,
    );
  }, [values.adSets, values.creatives]);

  return (
    <Box display="flex" justifyContent="left" alignItems="center" gap="5px">
      <RemoveButton disabled={disabled} creative={props.creative} />
      {props.creative.name}
      <div style={{ flexGrow: 1 }} />
      <Status state={props.creative.state} />
    </Box>
  );
};

const RemoveButton = (props: { disabled: boolean; creative: Creative }) => {
  const [, meta, helper] = useField<Creative[]>("creatives");
  const onRemoveCreative = async (c: Creative, v: Creative[] | undefined) => {
    const removed = _.filter(v ?? [], (n) => n.id !== c.id);
    helper.setValue(removed);
  };

  return (
    <Tooltip
      title={
        props.disabled
          ? "Unable to remove an ad that is part of an ad set"
          : "Remove ad from campaign"
      }
    >
      <span>
        <IconButton
          disabled={props.disabled}
          onClick={() => onRemoveCreative(props.creative, meta.value)}
          sx={{ p: 0 }}
        >
          <RemoveCircleOutlineIcon
            color={props.disabled ? "disabled" : "error"}
            fontSize="small"
          />
        </IconButton>
      </span>
    </Tooltip>
  );
};
