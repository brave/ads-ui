import { Chip, Tooltip } from "@mui/material";
import { isPast, parseISO } from "date-fns";
import React from "react";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { calcColorForState } from "./stateColors";
import _ from "lodash";

export const CampaignStatus: React.FC<{
  campaign: Pick<CampaignFragment, "state" | "endAt">;
}> = ({ campaign }) => {
  const state = campaign.state;
  const isAfterEndDate = isPast(parseISO(campaign.endAt));

  let label = state;
  let color = calcColorForState(state);

  if (isAfterEndDate && state === "active") {
    label += "*";
    color = calcColorForState("completed");
  }

  return (
    <Chip
      label={_.upperCase(label)}
      size="small"
      sx={{
        backgroundColor: color,
        fontSize: "0.7rem",
      }}
    />
  );
};
