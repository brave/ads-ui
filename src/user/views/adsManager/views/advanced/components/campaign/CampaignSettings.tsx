import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { CardContainer } from "components/Card/CardContainer";
import { CampaignDateRange } from "components/Campaigns/CampaignDateRange";
import { Typography } from "@mui/material";
import { FormatField } from "user/views/adsManager/views/advanced/components/campaign/fields/FormatField";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";
import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { BillingModelSelect } from "user/views/adsManager/views/advanced/components/campaign/components/BillingModelSelect";
import { CustomPriceSelect } from "user/views/adsManager/views/advanced/components/campaign/components/CustomPriceSelect";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { LearnMoreButton } from "components/Button/LearnMoreButton";
import { LocationPicker } from "components/Location/LocationPicker";

export function CampaignSettings(props: { prices: AdvertiserPrice[] }) {
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();

  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define how you want your campaign to run.{" "}
          <LearnMoreButton helpSection="getting-started/create-a-campaign" />
        </Typography>

        <FormikTextField name="name" label="Campaign Name" sx={{ mb: 1 }} />

        <BudgetField />

        <CampaignDateRange />

        {isDraft && <LocationPicker />}

        <Typography variant="caption">
          <strong>*</strong>Campaigns are processed during U.S. business hours.
          Processing can take more than 2 days.
        </Typography>
      </CardContainer>

      <FormatField prices={props.prices} />

      <CardContainer header="Pricing">
        {!advertiser.selfServiceSetPrice && (
          <BillingModelSelect prices={props.prices} />
        )}

        {advertiser.selfServiceSetPrice && <CustomPriceSelect />}
      </CardContainer>
    </>
  );
}
