import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { LocationField } from "user/views/adsManager/views/advanced/components/campaign/fields/LocationField";
import { Typography } from "@mui/material";
import { FormatField } from "user/views/adsManager/views/advanced/components/campaign/fields/FormatField";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";
import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { BillingModelSelect } from "user/views/adsManager/views/advanced/components/campaign/components/BillingModelSelect";
import { CustomPriceSelect } from "user/views/adsManager/views/advanced/components/campaign/components/CustomPriceSelect";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export function CampaignSettings(props: { prices: AdvertiserPrice[] }) {
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();

  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define how you want your campaign to run.
        </Typography>

        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <BudgetField />

        <CampaignDateRange />
      </CardContainer>

      <FormatField prices={props.prices} />

      <CardContainer header="Pricing">
        {!advertiser.selfServiceSetPrice && (
          <BillingModelSelect prices={props.prices} />
        )}

        {advertiser.selfServiceSetPrice && <CustomPriceSelect />}
      </CardContainer>

      {isDraft && <LocationField />}
    </>
  );
}
