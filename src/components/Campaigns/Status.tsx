import { Chip, Tooltip } from "@mui/material";
import { isPast, parseISO } from "date-fns";
import React from "react";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { calcColorForState } from "./stateColors";
import _ from "lodash";

export const Status: React.FC<{
  state: string;
  end: string;
}> = ({ state, end }) => {
  let color = calcColorForState(state);
  const isAfterEndDate = isPast(parseISO(end));

  let label = _.startCase(state);
  let tooltip = label;

  if (isAfterEndDate && state === "active") {
    label += "*";
    tooltip += " (after end date, considered completed)";
    color = calcColorForState("completed");
  }

  return (
    <Tooltip title={tooltip}>
      <Chip
        label={label}
        size="small"
        sx={{
          backgroundColor: color,
          fontSize: "0.7rem",
        }}
      />
    </Tooltip>
  );
};
