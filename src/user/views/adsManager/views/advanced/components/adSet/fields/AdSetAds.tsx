import { CardContainer } from "components/Card/CardContainer";
import { Stack, Typography } from "@mui/material";
import { CampaignForm } from "user/views/adsManager/types";
import { useField, useFormikContext } from "formik";
import { CreativeSelect } from "components/Creatives/CreativeSelect";
import { isCreativeTypeApplicableToCampaignFormat } from "user/library";
import { NewAd } from "user/ads/NewAd";
import { useContext } from "react";
import { FormContext } from "state/context";
import { AdsExistingAd } from "user/ads/AdsExistingAd";
import { CreativeSpecificFields } from "components/Creatives/CreativeSpecificFields";
import { ShowAdsButton } from "user/ads/ShowAdsButton";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const { values } = useFormikContext<CampaignForm>();
  const { isShowingAds } = useContext(FormContext);
  const [, meta] = useField<boolean>("isCreating");

  const adsByFormat = values.adSets[index].creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, values.format),
  );
  return (
    <>
      <CardContainer header="Ads">
        <Typography variant="body2" sx={{ mb: 3 }}>
          Select the Ads you would like to include in this ad set. Only checked
          Ads are included.
        </Typography>

        <Stack direction="row">
          <CreativeSelect index={index} options={adsByFormat}>
            <NewAd />
          </CreativeSelect>
        </Stack>

        <ShowAdsButton />
      </CardContainer>

      {isShowingAds && <AdsExistingAd />}
      {meta.value && <CreativeSpecificFields />}
    </>
  );
}
