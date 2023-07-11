import { Stack, Typography } from "@mui/material";
import { FormikRadioControl } from "form/FormikHelpers";
import { PaymentType } from "graphql/types";
import React from "react";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  isEdit: boolean;
}

export function PaymentMethodField({ isEdit }: Props) {
  const { values } = useFormikContext<CampaignForm>();
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
          disabled={isEdit && values.state !== "draft"}
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
