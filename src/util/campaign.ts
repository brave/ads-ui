import { CampaignFormat } from "graphql/types";

export const CAMPAIGN_FORMATS = [
  { value: CampaignFormat.PushNotification, label: "Notification ads" },
  { value: CampaignFormat.NtpSi, label: "New Tab Takeover" },
  { value: CampaignFormat.NewsDisplayAd, label: "Newsfeed ads" },
  { value: CampaignFormat.Search, label: "Search keyword ads" },
  { value: CampaignFormat.SearchHomepage, label: "Search Homepage ads" },
];

export function uiLabelsForCampaignFormat(format: CampaignFormat): string {
  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}
