import { CardContainer } from "@/components/Card/CardContainer";
import { Box, Modal, Typography } from "@mui/material";
import { CampaignForm } from "@/user/views/adsManager/types";
import { useField, useFormikContext } from "formik";
import { CreativeSelect } from "@/components/Creatives/CreativeSelect";
import { NewAd } from "@/user/ads/NewAd";
import { AdsExistingAd } from "@/user/ads/AdsExistingAd";
import { ShowAdsButton } from "@/user/ads/ShowAdsButton";
import { CampaignFormat } from "@/graphql-client/graphql";
import { NotificationAd } from "@/user/ads/NotificationAd";
import { InlineContentAd } from "@/user/ads/InlineContentAd";
import { modalStyles } from "@/theme";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";
import { Trans } from "@lingui/macro";
import { filterCreativesByCampaignFormat } from "@/user/ads/filterCreativesByCampaignFormat";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  const adsByFormat = filterCreativesByCampaignFormat(
    values.adSets[index].creatives,
    values.format,
  );
  return (
    <>
      <CardContainer header={<Trans>Ads</Trans>}>
        <Typography variant="body2" sx={{ mb: 3 }}>
          <Trans>
            Select the ads you would like to include in this ad set. Only
            checked ads are included.
          </Trans>{" "}
          <LearnMoreButton helpSection="getting-started/create-an-ad" />
        </Typography>

        <CreativeSelect index={index} options={adsByFormat}>
          <NewAd />
        </CreativeSelect>

        <ShowAdsButton />
      </CardContainer>

      <AdsExistingAd index={index} />
      <CampaignFormatSpecificModal format={values.format} index={index} />
    </>
  );
}

function CampaignFormatSpecificModal(props: {
  format: CampaignFormat;
  index: number;
}) {
  const [, meta, helper] = useField<boolean>("isCreating");
  const name = "newCreative";

  let adComponent;
  if (props.format === CampaignFormat.PushNotification)
    adComponent = (
      <NotificationAd name={name} useContainer={false} index={props.index} />
    );
  else if (props.format === CampaignFormat.NewsDisplayAd)
    adComponent = (
      <InlineContentAd
        name={name}
        useContainer={false}
        alignPreview="row"
        index={props.index}
      />
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
