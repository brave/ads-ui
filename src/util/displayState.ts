import { isNowAfterDate, isNowBeforeDate } from "util/isAfterEndDate";

export const displayFromCampaignState = (c: {
  campaignState: string;
  campaignEnd: string;
  campaignStart: string;
  state?: string | null;
}) => {
  if (c.campaignState === "draft") {
    return "draft";
  } else if (isNowBeforeDate(c.campaignStart)) {
    return "scheduled";
  } else if (isNowAfterDate(c.campaignEnd)) {
    return "completed";
  }

  return c.state ?? "draft";
};

export const isReviewableState = (c?: string) =>
  c === "draft" || c === "under_review" || c === "completed";
