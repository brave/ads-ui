import { CampaignFormat } from "graphql/types";

export const CAMPAIGN_FORMATS = [
  { value: CampaignFormat.PushNotification, label: "Notification" },
  { value: CampaignFormat.NtpSi, label: "New tab takeover" },
  { value: CampaignFormat.NewsDisplayAd, label: "Newsfeed" },
  { value: CampaignFormat.Search, label: "Search keyword" },
  { value: CampaignFormat.SearchHomepage, label: "Search homepage" },
];

export function uiLabelsForCampaignFormat(format: CampaignFormat): string {
  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}
