import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";
import { CampaignDateRange } from "@/components/Campaigns/CampaignDateRange";
import { CardContainer } from "@/components/Card/CardContainer";
import { LocationPicker } from "@/components/Location/LocationPicker";
import { FormikTextField } from "@/form/FormikHelpers";
import { useTrackMatomoPageView } from "@/hooks/useTrackWithMatomo";
import { AdvertiserPrice } from "@/user/hooks/useAdvertiserWithPrices";
import { BillingModelSelect } from "@/user/views/adsManager/views/advanced/components/campaign/components/BillingModelSelect";
import { CustomPriceSelect } from "@/user/views/adsManager/views/advanced/components/campaign/components/CustomPriceSelect";
import { BudgetField } from "@/user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { FormatField } from "@/user/views/adsManager/views/advanced/components/campaign/fields/FormatField";
import { Typography } from "@mui/material";

export function CampaignSettings(props: { prices: AdvertiserPrice[] }) {
  const { advertiser } = useAdvertiser();
  useTrackMatomoPageView({ documentTitle: "Campaign Settings" });

  return (
    <>
      <CardContainer header="Campaign Settings">
        <Typography variant="body2" gutterBottom>
          Define how you want your campaign to run.{" "}
          <LearnMoreButton helpSection="getting-started/create-a-campaign" />
        </Typography>

        <FormikTextField name="name" label={"Campaign Name"} sx={{ mb: 1 }} />

        <BudgetField />

        <CampaignDateRange />

        <LocationPicker />
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
