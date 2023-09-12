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
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";
import _ from "lodash";
import { CardContainer } from "components/Card/CardContainer";
import { uiLabelsForBillingType } from "util/billingType";
import { uiTextForCampaignFormat } from "user/library";
import { CampaignFormat } from "graphql/types";

type DefaultPrice = { cpm: number; cpc: number };
const campaignDefaultPrices = new Map<CampaignFormat, DefaultPrice>([
  [CampaignFormat.PushNotification, { cpm: 6, cpc: 0.1 }],
  [CampaignFormat.NewsDisplayAd, { cpm: 10, cpc: 0.15 }],
]);

export function BudgetField() {
  const [, , dailyBudget] = useField<number>("dailyBudget");
  const [, , price] = useField<number>("price");
  const { isDraft } = useIsEdit();
  const { advertiser } = useAdvertiser();
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
          disabled={!isDraft && !advertiser.selfServiceSetPrice}
        />

        {!advertiser.selfServiceSetPrice ? (
          <Typography variant="body2">
            {uiTextForCampaignFormat(values.format)} campaigns are priced at a
            flat rate of{" "}
            <strong>
              ${values.price} {_.upperCase(values.billingType)}
            </strong>
            .
          </Typography>
        ) : (
          <Stack direction="column" spacing={2} alignItems="flex-start">
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

            <FormikRadioControl
              name="billingType"
              onChange={(e) => {
                const defaultPrice = campaignDefaultPrices.get(values.format);
                if (defaultPrice)
                  price.setValue(
                    defaultPrice[e.target.value as keyof DefaultPrice],
                  );
              }}
              options={[
                {
                  value: "cpm",
                  label: uiLabelsForBillingType("cpm").longLabel,
                },
                {
                  value: "cpc",
                  label: uiLabelsForBillingType("cpc").longLabel,
                },
              ]}
              disabled={
                !isDraft || values.format === CampaignFormat.NewsDisplayAd
              }
            />
          </Stack>
        )}
      </Stack>
    </CardContainer>
  );
}
