import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignFormat } from "graphql/types";
import { NotificationAd } from "user/ads/NotificationAd";

export const CreativeSpecificFields = () => {
  const { values } = useFormikContext<CampaignForm>();

  if (values.format === CampaignFormat.PushNotification)
    return <NotificationAd />;

  return null;
};
