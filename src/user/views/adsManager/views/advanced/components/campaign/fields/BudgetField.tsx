import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "form/FormikHelpers";
import React, { useEffect, useState } from "react";
import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { differenceInHours } from "date-fns";
import { CPM, MIN_PER_CAMPAIGN, MIN_PER_DAY } from "validation/CampaignSchema";
import _ from "lodash";

interface Props {
  canSetPrice: boolean;
  isEdit: boolean;
}

export function BudgetField({ canSetPrice, isEdit }: Props) {
  const { values, setFieldValue, errors } = useFormikContext<CampaignForm>();
  const [minBudget, setMinBudget] = useState(MIN_PER_CAMPAIGN);
  const campaignRuntime = Math.floor(
    differenceInHours(new Date(values.endAt), new Date(values.startAt)) / 24
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
    <Box>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Budget
      </Divider>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Set a limit on how much your campaign will spend.
      </Typography>
      <Stack direction="column" spacing={2}>
        <FormikTextField
          name="budget"
          label="Lifetime Budget"
          margin="none"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          }}
          helperText={
            errors.budget || errors.dailyBudget
              ? `${errors.dailyBudget}. Minimum $${minBudget}.`
              : undefined
          }
          error={!!errors.budget || !!errors.dailyBudget}
        />

        {!canSetPrice ? (
          <Typography variant="body2">
            Pricing type is <strong>{_.upperCase(values.billingType)}</strong>{" "}
            with a flat rate of <strong>${values.price}</strong>.
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
      </Stack>
    </Box>
  );
}
