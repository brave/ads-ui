import { InputAdornment, Stack, Typography } from "@mui/material";
import {
  FormikRadioControl,
  FormikTextField,
  useIsEdit,
} from "form/FormikHelpers";
import { useEffect, useState } from "react";
import { useField, useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { differenceInHours } from "date-fns";
import { MIN_PER_CAMPAIGN, MIN_PER_DAY } from "validation/CampaignSchema";
import _ from "lodash";
import { CardContainer } from "components/Card/CardContainer";
import { uiLabelsForBillingType } from "util/billingType";
import { uiTextForCampaignFormat } from "user/library";
import { CampaignFormat } from "graphql/types";
import { useAdvertiserWithPrices } from "user/hooks/useAdvertiserWithPrices";

export function BudgetField() {
  const [, , dailyBudget] = useField<number>("dailyBudget");
  const { isDraft } = useIsEdit();
  const { data, loading } = useAdvertiserWithPrices();
  const { values, errors } = useFormikContext<CampaignForm>();
  const [minBudget, setMinBudget] = useState(MIN_PER_CAMPAIGN);
  const campaignRuntime = Math.floor(
    differenceInHours(new Date(values.endAt), new Date(values.startAt)) / 24,
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
          disabled={!isDraft && !data.selfServiceSetPrice}
        />

        <Stack direction="column" spacing={2} alignItems="flex-start">
          <FormikRadioControl
            label="Billing Type"
            name="billingModel"
            options={data.prices
              .filter((p) => p.format === values.format)
              .map((p) => ({
                label: uiLabelsForBillingType(p.billingType).longLabel,
                value: { price: p.billingModelPrice, type: p.billingType },
              }))}
            disabled={
              loading ||
              !isDraft ||
              values.format === CampaignFormat.NewsDisplayAd
            }
          />
          {!data.selfServiceSetPrice ? (
            <Typography variant="body2">
              {uiTextForCampaignFormat(values.format)} campaigns are priced at a
              flat rate of{" "}
              <strong>
                ${values.price} {_.upperCase(values.type)}
              </strong>
              .
            </Typography>
          ) : (
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
          )}
        </Stack>
      </Stack>
    </CardContainer>
  );
}
