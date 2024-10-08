import { Alert, AlertTitle, Stack, Typography } from "@mui/material";
import { FormikRadioControl, useIsEdit } from "@/form/FormikHelpers";
import { PaymentType } from "@/graphql-client/graphql";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { CardContainer } from "@/components/Card/CardContainer";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";
import { t, Trans } from "@lingui/macro";
import BigNumber from "bignumber.js";
import { useField } from "formik";
import { useCallback } from "react";
import { useGetAdvertiserAccountBalance } from "@/user/hooks/useGetAdvertiserAccountBalance";
import { formatUsd } from "@/user/library/format";

export function PaymentMethodField() {
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();
  const [, meta] = useField<number>("budget");
  const { loading, data } = useGetAdvertiserAccountBalance();

  if (advertiser.selfServiceSetPrice) {
    return null;
  }

  const balance = BigNumber(data?.advertiser?.accountBalance ?? "0");
  const amountOwed = useCallback(
    (balance: BigNumber) => {
      const budget = BigNumber(meta.value).minus(balance);
      if (budget.lte(0)) return BigNumber(0);
      return budget;
    },
    [meta.value],
  );

  const chargeMessage = (b: BigNumber) => {
    if (b.lte(0)) return t`and no additional charges will be incurred.`;
    const amountToCharge = formatUsd(b);
    return t`and you will be charged ${amountToCharge} USD.`;
  };

  return (
    <CardContainer header={<Trans>Payment</Trans>}>
      <Stack spacing={1}>
        <Typography variant="body2">
          <Trans>Payment is required before launching your campaign.</Trans>{" "}
          <LearnMoreButton helpSection="getting-started/launch-your-campaign" />
        </Typography>
        <FormikRadioControl
          disabled={!isDraft || loading || amountOwed(balance).lte(0)}
          name="paymentType"
          options={[
            { label: "USD", value: advertiser.selfServicePaymentType },
            { label: "BAT", value: PaymentType.Radom },
          ]}
        />
      </Stack>
      {balance.gt(0) && isDraft && (
        <Alert severity="info">
          <AlertTitle>
            <Trans>Account Balance will be applied to this campaign</Trans>
          </AlertTitle>
          <Trans>
            Your account has a balance of {formatUsd(balance)} USD. This will be
            applied to your campaign
          </Trans>
          {", "}
          {chargeMessage(amountOwed(balance))}
        </Alert>
      )}
    </CardContainer>
  );
}
