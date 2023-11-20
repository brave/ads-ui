import { CardContainer } from "components/Card/CardContainer";
import { Typography } from "@mui/material";
import { CampaignForm } from "user/views/adsManager/types";
import { useFormikContext } from "formik";
import { CreativeSelect } from "components/Creatives/CreativeSelect";
import { isCreativeTypeApplicableToCampaignFormat } from "user/library";

interface Props {
  index: number;
}

export function AdSetAds({ index }: Props) {
  const { values } = useFormikContext<CampaignForm>();

  const adsByFormat = values.adSets[index].creatives.filter((c) =>
    isCreativeTypeApplicableToCampaignFormat(c.type, values.format),
  );
  return (
    <CardContainer header="Ads">
      <Typography variant="body2" sx={{ mb: 3 }}>
        Select the Ads you would like to include in this ad set.
      </Typography>

      <CreativeSelect index={index} options={adsByFormat} />
    </CardContainer>
  );
}
