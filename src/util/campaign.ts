import { CampaignFormat } from "@/graphql-client/graphql";
import dayjs from "dayjs";
import BigNumber from "bignumber.js";

export function uiLabelsForCampaignFormat(format: CampaignFormat): string {
  const CAMPAIGN_FORMATS = [
    { value: CampaignFormat.PushNotification, label: "Notification" },
    { value: CampaignFormat.NtpSi, label: "New tab takeover" },
    { value: CampaignFormat.NewsDisplayAd, label: "Newsfeed" },
    { value: CampaignFormat.Search, label: "Search keyword" },
    { value: CampaignFormat.SearchHomepage, label: "Search homepage" },
  ];

  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}

const MIN_PER_DAY = 33;
export const isFuzzyCalculatedDailyBudgetOk = (startAt: Date, endAt: Date) => {
  const campaignRuntime = dayjs(endAt).diff(dayjs(startAt), "day");
  const hasRuntime = campaignRuntime > 0;

  const min = BigNumber(MIN_PER_DAY).times(campaignRuntime);
  const ok = (value: number) =>
    hasRuntime ? BigNumber(value).div(campaignRuntime).gte(MIN_PER_DAY) : true;
  return { ok, min };
};
