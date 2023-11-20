import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { LocationField } from "user/views/adsManager/views/advanced/components/campaign/fields/LocationField";
import { Typography } from "@mui/material";
import { FormatField } from "user/views/adsManager/views/advanced/components/campaign/fields/FormatField";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";

export function CampaignSettings(props: { prices: AdvertiserPrice[] }) {
  const { isDraft } = useIsEdit();

  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define when you want your campaign to run.
        </Typography>

        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <CampaignDateRange />
      </CardContainer>

      <FormatField prices={props.prices} />

      {isDraft && <LocationField />}
    </>
  );
}
