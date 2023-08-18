import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { CampaignFormat } from "graphql/types";
import { NotificationAd } from "user/ads/NotificationAd";

interface Props {
  onCreate: () => void;
}

export const CreativeSpecificFields = ({ onCreate }: Props) => {
  const { values } = useFormikContext<CampaignForm>();

  if (values.format === CampaignFormat.PushNotification)
    return <NotificationAd onCreate={onCreate} />;

  return null;
};
