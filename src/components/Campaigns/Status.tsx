import { Chip, Tooltip } from "@mui/material";
import React from "react";
import { calcColorForState } from "./stateColors";
import _ from "lodash";
import { isAfterEndDate } from "util/isAfterEndDate";

export const Status: React.FC<{
  state: string;
  end: string;
}> = ({ state, end }) => {
  let color = calcColorForState(state);

  let label = _.startCase(state);

  if (isAfterEndDate(end) && state === "active") {
    label = "Completed";
    color = calcColorForState("completed");
  }

  return (
    <Tooltip title={label}>
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
