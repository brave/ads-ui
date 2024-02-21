import { FormControlLabel, Switch, Typography } from "@mui/material";
import _ from "lodash";
import moment from "moment";
import { useContext } from "react";
import { FilterContext } from "state/context";
import { Trans } from "@lingui/macro";

interface Props {
  disabled?: boolean;
}

export const CampaignAgeFilter = ({ disabled }: Props) => {
  const { fromDate, setFromDate } = useContext(FilterContext);
  const onOldCampaignToggle = (showOld: boolean) => {
    setFromDate(
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
          <Trans>Include campaigns that ended over 6 months ago</Trans>
        </Typography>
      }
    />
  );
};
