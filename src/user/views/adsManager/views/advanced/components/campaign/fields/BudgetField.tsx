import { InputAdornment, Stack, Typography } from "@mui/material";
import {
  FormikRadioControl,
  FormikTextField,
  useIsEdit,
} from "form/FormikHelpers";
import { useCallback, useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { Billing, CampaignForm } from "../../../../../types";
import { differenceInHours } from "date-fns";
import { MIN_PER_CAMPAIGN, MIN_PER_DAY } from "validation/CampaignSchema";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import _ from "lodash";
import { CardContainer } from "components/Card/CardContainer";
import { uiLabelsForBillingType } from "util/billingType";
import { uiTextForCampaignFormat } from "user/library";
import { AdvertiserPriceFragment } from "graphql/advertiser.generated";

export function BudgetField(props: { prices: AdvertiserPriceFragment[] }) {
  const [, , dailyBudget] = useField<number>("dailyBudget");
  const [, , campaignPrice] = useField<string>("price");
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();
  const { values, errors } = useFormikContext<CampaignForm>();
  const [minBudget, setMinBudget] = useState(MIN_PER_CAMPAIGN);
  const campaignRuntime = Math.floor(
    differenceInHours(new Date(values.endAt), new Date(values.startAt)) / 24,
  );

  const isBillingTypeDisabled = useCallback(
    (billing: Billing) => {
      const billingType = billing.toUpperCase();
      return (
        props.prices.find(
          (p) => p.format === values.format && p.billingType === billingType,
        ) === undefined
      );
    },
    [values.format, props.prices],
  );

  useEffect(() => {
    const calculatedBudget =
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

    dailyBudget.setValue(calculatedBudget);
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
          disabled={!isDraft && !advertiser.selfServiceSetPrice}
        />

        <Stack direction="column" spacing={2} alignItems="flex-start">
          <FormikRadioControl
            name="billingType"
            label="Billing Type"
            onChange={(e) => {
              const billingType = e.target.value.toUpperCase();
              const price = props.prices.find(
                (p) =>
                  p.format === values.format && p.billingType === billingType,
              );
              if (price) campaignPrice.setValue(price?.billingModelPrice);
            }}
            options={[
              {
                value: "cpm",
                label: uiLabelsForBillingType("cpm").longLabel,
                disabled: isBillingTypeDisabled("cpm") && !isDraft,
              },
              {
                value: "cpc",
                label: uiLabelsForBillingType("cpc").longLabel,
                disabled: isBillingTypeDisabled("cpc") && !isDraft,
              },
              {
                value: "cpqv",
                label: uiLabelsForBillingType("cpqv").longLabel,
                disabled: isBillingTypeDisabled("cpqv") && !isDraft,
              },
            ]}
          />

          {advertiser.selfServiceSetPrice ? (
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
              disabled={!isDraft}
            />
          ) : (
            <Typography variant="body2">
              <strong>{_.upperCase(values.billingType)}</strong>{" "}
              {uiTextForCampaignFormat(values.format)} campaigns are priced at a
              flat rate of <strong>${values.price}</strong>.
            </Typography>
          )}
        </Stack>
      </Stack>
    </CardContainer>
  );
}
