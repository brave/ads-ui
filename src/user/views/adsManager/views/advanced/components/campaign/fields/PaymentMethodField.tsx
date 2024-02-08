import { Stack, Typography } from "@mui/material";
import { FormikRadioControl, useIsEdit } from "form/FormikHelpers";
import { PaymentType } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";
import { LearnMoreButton } from "components/Button/LearnMoreButton";
import { Trans } from "@lingui/macro";

export function PaymentMethodField() {
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();

  if (advertiser.selfServiceSetPrice) {
    return null;
  }

  return (
    <CardContainer header={<Trans>Payment</Trans>}>
      <Stack spacing={1}>
        <Typography variant="body2">
          <Trans>Payment is required before launching your campaign.</Trans>
          <LearnMoreButton helpSection="getting-started/launch-your-campaign" />
        </Typography>
        <FormikRadioControl
          disabled={!isDraft}
          name="paymentType"
          options={[
            { label: "USD", value: advertiser.selfServicePaymentType },
            { label: "BAT", value: PaymentType.Radom },
          ]}
        />
      </Stack>
    </CardContainer>
  );
}
