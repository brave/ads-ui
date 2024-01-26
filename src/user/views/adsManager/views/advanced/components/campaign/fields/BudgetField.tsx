import {InputAdornment} from "@mui/material";
import {FormikTextField, useIsEdit} from "form/FormikHelpers";
import {useEffect, useState} from "react";
import {useField, useFormikContext} from "formik";
import {CampaignForm} from "../../../../../types";
import {differenceInHours} from "date-fns";
import {MIN_PER_CAMPAIGN, MIN_PER_DAY} from "validation/CampaignSchema";
import {useAdvertiserWithPrices} from "user/hooks/useAdvertiserWithPrices";

export function BudgetField() {
  const [, , dailyBudget] = useField<number>("dailyBudget");
  const {isDraft} = useIsEdit();
  const {data} = useAdvertiserWithPrices();
  const {values, errors} = useFormikContext<CampaignForm>();
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
  );
}
