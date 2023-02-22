import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import { FormikTextField } from "../../../../../../../../form/FormikHelpers";
import React, { useEffect } from "react";
import { useField, useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { differenceInDays } from "date-fns";
import {
  MIN_PER_CAMPAIGN,
  MIN_PER_DAY,
} from "../../../../../../../../validation/CampaignSchema";
import _ from "lodash";

interface Props {
  isEdit: boolean;
}

export function BudgetField({ isEdit }: Props) {
  const { values, setFieldValue } = useFormikContext<CampaignForm>();
  const campaignRuntime = differenceInDays(
    new Date(values.endAt),
    new Date(values.startAt)
  );

  useEffect(() => {
    const dailyBudget =
      campaignRuntime > 0
        ? Math.ceil(Number(values.budget) / campaignRuntime)
        : values.budget;
    const minLifetime =
      campaignRuntime > 0 && values.budget >= MIN_PER_CAMPAIGN
        ? MIN_PER_DAY * campaignRuntime
        : MIN_PER_CAMPAIGN;

    if (minLifetime >= values.budget) {
      setFieldValue("budget", minLifetime);
    }
    setFieldValue("dailyBudget", dailyBudget);
  }, [campaignRuntime, values.budget]);

  return (
    <Box>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Budget
      </Divider>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Set a limit on how much your campaign will spend.
      </Typography>
      <Stack direction="column" spacing={1}>
        <FormikTextField
          name="budget"
          label="Lifetime Budget"
          margin="none"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
            endAdornment: <InputAdornment position="end">USD</InputAdornment>,
          }}
          disabled={isEdit}
        />

        {!isEdit && (
          <Typography variant="body2">
            Pricing type is{" "}
            <strong>{_.upperCase(values.adSets[0].billingType)}</strong> with a
            flat rate of <strong>${values.adSets[0].price}</strong>.
          </Typography>
        )}

        {/*<FormikTextField*/}
        {/*  name="dailyBudget"*/}
        {/*  label="Daily Budget"*/}
        {/*  type="number"*/}
        {/*  margin="none"*/}
        {/*  InputProps={{*/}
        {/*    startAdornment: <InputAdornment position="start">$</InputAdornment>,*/}
        {/*  }}*/}
        {/*/>*/}

        {/*<FormikRadioControl*/}
        {/*  name="currency"*/}
        {/*  label="Currency"*/}
        {/*  options={[*/}
        {/*    { value: "BAT", label: "BAT" },*/}
        {/*    { value: "USD", label: "USD" },*/}
        {/*  ]}*/}
        {/*  disabled={isEdit}*/}
        {/*/>*/}
      </Stack>
    </Box>
  );
}
