import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "form/FormikHelpers";
import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { differenceInHours } from "date-fns";
import { MIN_PER_CAMPAIGN, MIN_PER_DAY } from "validation/CampaignSchema";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import { PaymentType } from "graphql/types";
import _ from "lodash";
import { CardContainer } from "components/Card/CardContainer";

interface Props {
  isEdit: boolean;
}

export function BudgetField({ isEdit }: Props) {
  const { advertiser } = useAdvertiser();
  const { values, setFieldValue, errors } = useFormikContext<CampaignForm>();
  const [minBudget, setMinBudget] = useState(MIN_PER_CAMPAIGN);
  const campaignRuntime = Math.floor(
    differenceInHours(new Date(values.endAt), new Date(values.startAt)) / 24,
  );

  useEffect(() => {
    const dailyBudget =
      campaignRuntime > 0
        ? Math.floor(Number(values.budget) / campaignRuntime)
        : values.budget;
    const minLifetime =
      campaignRuntime > 0 && values.budget >= MIN_PER_CAMPAIGN
        ? MIN_PER_DAY * campaignRuntime
        : MIN_PER_CAMPAIGN;

    if (values.budget <= minLifetime) {
      setMinBudget(minLifetime);
    }

    setFieldValue("dailyBudget", dailyBudget);
  }, [campaignRuntime, values.budget, minBudget]);

  return (
    <CardContainer header="Budget">
      <Typography variant="body2" gutterBottom>
        Set a limit on how much your campaign will spend.
      </Typography>
      <Stack direction="column" spacing={2}>
        <FormikTextField
          name="budget"
          label="Lifetime Budget"
          margin="normal"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: (
              <InputAdornment position="end">{values.currency}</InputAdornment>
            ),
          }}
          helperText={
            errors.budget || errors.dailyBudget
              ? `${errors.dailyBudget}. Minimum $${minBudget}.`
              : undefined
          }
          error={!!errors.budget || !!errors.dailyBudget}
          disabled={isEdit && !advertiser.selfServiceSetPrice}
        />

        {!advertiser.selfServiceSetPrice ? (
          <Typography variant="body2">
            Campaigns are priced at a flat rate of{" "}
            <strong>
              ${values.price} {_.upperCase(values.billingType)}
            </strong>
            .
          </Typography>
        ) : (
          <Stack direction="row" spacing={2} alignItems="center">
            <FormikTextField
              fullWidth={false}
              name="price"
              label="Price"
              type="number"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              disabled={isEdit}
            />

            <FormikRadioControl
              name="billingType"
              options={[
                { value: "cpm", label: "CPM (Impressions)" },
                { value: "cpc", label: "CPC (Clicks)" },
              ]}
              disabled={isEdit}
            />
          </Stack>
        )}

        <Stack spacing={1}>
          <Typography variant="subtitle1" sx={{ fontWeight: 500, mt: 1 }}>
            Payment Method
          </Typography>
          <Typography variant="body2">
            Prepayment of the campaign budget is required before your campaign
            can begin.{" "}
            {values.paymentType !== PaymentType.Stripe
              ? "We will contact you to arrange payment after you submit your campaign for approval."
              : ""}
          </Typography>
          <FormikRadioControl
            disabled={isEdit}
            name="paymentType"
            options={[
              { label: "USD", value: advertiser.selfServicePaymentType },
              { label: "BAT", value: PaymentType.ManualBat },
            ]}
          />
        </Stack>
      </Stack>
    </CardContainer>
  );
}
