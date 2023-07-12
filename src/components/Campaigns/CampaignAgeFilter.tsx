import { FormControlLabel, Switch, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import React, { Dispatch } from "react";

interface Props {
  fromDate: Date | null;
  onChange: Dispatch<Date | null>;
  disabled?: boolean;
}

export const CampaignAgeFilter: React.FC<Props> = ({
  fromDate,
  onChange,
  disabled,
}) => {
  const onOldCampaignToggle = (showOld: boolean) => {
    onChange(
      showOld ? null : moment().subtract(6, "month").startOf("day").toDate(),
    );
  };

  return (
    <FormControlLabel
      labelPlacement="start"
      sx={{ mr: 2 }}
      disabled={disabled}
      control={
        <Switch
          size="medium"
          checked={_.isNil(fromDate)}
          onChange={(e) => onOldCampaignToggle(e.target.checked)}
        />
      }
      label={
        <Typography variant="body1">
          Include campaigns that ended over 6 months ago
        </Typography>
      }
    />
  );
};
