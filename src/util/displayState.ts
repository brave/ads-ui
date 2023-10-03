import { isAfterEndDate, isBeforeStartDate } from "util/isAfterEndDate";

export const displayFromCampaignState = (c: {
  campaignState: string;
  campaignEnd: string;
  campaignStart: string;
  state?: string | null;
}) => {
  if (c.campaignState === "draft") {
    return "draft";
  } else if (isBeforeStartDate(c.campaignStart)) {
    return "scheduled";
  } else if (isAfterEndDate(c.campaignEnd)) {
    return "completed";
  }

  return c.state ?? "draft";
};
