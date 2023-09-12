import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignFormat } from "graphql/types";
import { NotificationAd } from "user/ads/NotificationAd";
import { InlineContentAd } from "user/ads/InlineContentAd";

export const CreativeSpecificFields = () => {
  const { values } = useFormikContext<CampaignForm>();

  if (values.format === CampaignFormat.PushNotification)
    return <NotificationAd />;
  else if (values.format === CampaignFormat.NewsDisplayAd)
    return <InlineContentAd />;

  return null;
};
