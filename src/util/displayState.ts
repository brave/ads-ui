import { isAfterEndDate, isBeforeStartDate } from "util/isAfterEndDate";

export const displayFromCampaignState = (c: {
  campaignState: string;
  campaignEnd: string;
  campaignStart: string;
  state: string;
}) => {
  if (isBeforeStartDate(c.campaignStart)) {
    return "scheduled";
  } else if (isAfterEndDate(c.campaignEnd)) {
    return "completed";
  } else {
    return c.state;
  }
};
