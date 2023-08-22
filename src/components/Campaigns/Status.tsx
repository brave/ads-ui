import { Chip, Tooltip } from "@mui/material";
import { calcColorForState } from "./stateColors";
import _ from "lodash";
import { isAfterEndDate, isBeforeStartDate } from "util/isAfterEndDate";

interface Props {
  state: string;
  start?: string;
  end?: string;
  opaque?: boolean;
}

export const Status = ({ state, start, end, opaque }: Props) => {
  let color = calcColorForState(state);

  let label = _.startCase(state);

  if (start) {
    if (isBeforeStartDate(start) && state === "active") {
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
          opacity: opaque === false ? "0.3" : 1,
        }}
      />
    </Tooltip>
  );
};
