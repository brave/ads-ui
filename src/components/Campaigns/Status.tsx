import { Chip, Tooltip } from "@mui/material";
import { isPast, parseISO } from "date-fns";
import React from "react";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { calcColorForState } from "./stateColors";
import _ from "lodash";

export const Status: React.FC<{
  state: string;
}> = ({ state }) => {
  let color = calcColorForState(state);

  return (
    <Chip
      label={_.upperCase(state)}
      size="small"
      sx={{
        backgroundColor: color,
        fontSize: "0.7rem",
      }}
    />
  );
};
