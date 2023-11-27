import { CampaignFormat } from "graphql/types";

export const CAMPAIGN_FORMATS = [
  { value: CampaignFormat.PushNotification, label: "Push Notification" },
  { value: CampaignFormat.NtpSi, label: "New Tab Takeover" },
  { value: CampaignFormat.NewsDisplayAd, label: "News Display" },
  { value: CampaignFormat.Search, label: "Search" },
  { value: CampaignFormat.SearchHomepage, label: "Search Homepage" },
];

export function uiLabelsForCampaignFormat(format: CampaignFormat): string {
  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}
