import { Chip, Tooltip } from "@mui/material";
import React from "react";
import { calcColorForState } from "./stateColors";
import _ from "lodash";
import { isAfterEndDate, isBeforeStartDate } from "util/isAfterEndDate";

export const Status: React.FC<{
  state: string;
  start?: string;
  end?: string;
}> = ({ state, start, end }) => {
  let color = calcColorForState(state);

  let label = _.startCase(state);

  if (start) {
    if (isBeforeStartDate(start)) {
      label = "Scheduled";
      color = "#e2e2fc";
    }
  }

  if (end) {
    if (isAfterEndDate(end) && state === "active") {
      label = "Completed";
      color = calcColorForState("completed");
    }
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
