import { Stack, Typography } from "@mui/material";
import { FormikRadioControl, useIsEdit } from "form/FormikHelpers";
import { PaymentType } from "graphql/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";

export function PaymentMethodField() {
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();

  if (advertiser.selfServiceSetPrice) {
    return null;
  }

  return (
    <CardContainer header="Payment Method">
      <Stack spacing={1}>
        <Typography variant="body2">
          Prepayment of the campaign budget is required before your campaign can
          begin.
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
