import { CardContainer } from "components/Card/CardContainer";
import { Box, Modal, Typography } from "@mui/material";
import { CampaignForm } from "user/views/adsManager/types";
import { useField, useFormikContext } from "formik";
import { CreativeSelect } from "components/Creatives/CreativeSelect";
import { isCreativeTypeApplicableToCampaignFormat } from "user/library";
import { NewAd } from "user/ads/NewAd";
import { AdsExistingAd } from "user/ads/AdsExistingAd";
import { ShowAdsButton } from "user/ads/ShowAdsButton";
import { CampaignFormat } from "graphql/types";
import { NotificationAd } from "user/ads/NotificationAd";
import { InlineContentAd } from "user/ads/InlineContentAd";
import { modalStyles } from "theme";
import { LearnMoreButton } from "components/Button/LearnMoreButton";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  const adsByFormat = values.adSets[index].creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, values.format),
  );
  return (
    <>
      <CardContainer header="Ads">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Select the ads you would like to include in this ad set. Only checked
          Ads are included.{" "}
          <LearnMoreButton helpSection="getting-started/create-an-ad" />
        </Typography>

        <CreativeSelect index={index} options={adsByFormat}>
          <NewAd />
        </CreativeSelect>

        <ShowAdsButton />
      </CardContainer>

      <AdsExistingAd />
      <CampaignFormatSpecificModal format={values.format} />
    </>
  );
}

function CampaignFormatSpecificModal(props: { format: CampaignFormat }) {
  const [, meta, helper] = useField<boolean>("isCreating");
  const name = "newCreative";

  let adComponent;
  if (props.format === CampaignFormat.PushNotification)
    adComponent = <NotificationAd name={name} useContainer={false} />;
  else if (props.format === CampaignFormat.NewsDisplayAd)
    adComponent = (
      <InlineContentAd name={name} useContainer={false} alignPreview="row" />
    );

  return (
    <Modal
      open={!!adComponent && meta.value}
      onClose={() => helper.setValue(false)}
    >
      <Box sx={modalStyles}>{adComponent}</Box>
    </Modal>
  );
}
