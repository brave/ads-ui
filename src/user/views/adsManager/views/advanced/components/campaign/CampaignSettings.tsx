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
import { useTrackMatomoPageView } from "hooks/useTrackWithMatomo";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

export function CampaignSettings(props: { prices: AdvertiserPrice[] }) {
  const { isDraft } = useIsEdit();
  const { _ } = useLingui();
  const { advertiser } = useAdvertiser();
  useTrackMatomoPageView({ documentTitle: "Campaign Settings" });

  return (
    <>
      <CardContainer header={<Trans>Campaign Settings</Trans>}>
        <Typography variant="body2" gutterBottom>
          <Trans>Define how you want your campaign to run.</Trans>
          <LearnMoreButton helpSection="getting-started/create-a-campaign" />
        </Typography>

        <FormikTextField
          name="name"
          label={_(msg`Campaign Name`)}
          sx={{ mb: 1 }}
        />

        <BudgetField />

        <CampaignDateRange />

        {isDraft && <LocationPicker />}
      </CardContainer>

      <FormatField prices={props.prices} />

      <CardContainer header={<Trans>Pricing</Trans>}>
        {!advertiser.selfServiceSetPrice && (
          <BillingModelSelect prices={props.prices} />
        )}

        {advertiser.selfServiceSetPrice && <CustomPriceSelect />}
      </CardContainer>
    </>
  );
}
