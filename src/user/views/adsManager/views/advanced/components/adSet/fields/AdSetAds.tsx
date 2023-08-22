import { CardContainer } from "components/Card/CardContainer";
import { Typography } from "@mui/material";
import { CampaignForm } from "user/views/adsManager/types";
import { useFormikContext } from "formik";
import { CampaignFormat } from "graphql/types";
import { NotificationSelect } from "components/Creatives/NotificationSelect";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  return (
    <CardContainer header="Ads">
      <Typography variant="body2" sx={{ mb: 3 }}>
        Select the Ads you would like to include in this ad set.
      </Typography>

      <AdSetSpecificSelect index={index} />
    </CardContainer>
  );
}

const AdSetSpecificSelect = (props: { index: number }) => {
  const { values } = useFormikContext<CampaignForm>();

  if (values.format === CampaignFormat.PushNotification) {
    return (
      <NotificationSelect
        options={values.creatives ?? []}
        fieldName={`adSets.${props.index}.creatives`}
      />
    );
  }

  return null;
};
