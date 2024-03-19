import { isDateInThePast, isDateInTheFuture } from "util/isAfterEndDate";

export const displayFromCampaignState = (c: {
  campaignState: string;
  campaignEnd: string;
  campaignStart: string;
  state?: string | null;
}) => {
  if (c.campaignState === "draft") {
    return "draft";
  } else if (isDateInTheFuture(c.campaignStart)) {
    return "scheduled";
  } else if (isDateInThePast(c.campaignEnd)) {
    return "completed";
  }

  return c.state ?? "draft";
};

export const isReviewableState = (c?: string) =>
  c === "draft" || c === "under_review" || c === "completed";
