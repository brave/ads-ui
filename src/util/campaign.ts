import { CampaignFormat } from "graphql/types";
import { t } from "@lingui/macro";

export function uiLabelsForCampaignFormat(format: CampaignFormat): string {
  const CAMPAIGN_FORMATS = [
    { value: CampaignFormat.PushNotification, label: t`Notification" ` },
    { value: CampaignFormat.NtpSi, label: t`New tab takeover` },
    { value: CampaignFormat.NewsDisplayAd, label: t`Newsfeed` },
    { value: CampaignFormat.Search, label: t`Search keyword` },
    { value: CampaignFormat.SearchHomepage, label: t`Search homepage` },
  ];

  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}
