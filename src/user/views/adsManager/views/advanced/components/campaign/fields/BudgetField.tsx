import { Box, Divider, InputAdornment, Stack, Typography } from "@mui/material";
import {
  FormikRadioControl,
  FormikRadioGroup,
  FormikTextField,
} from "../../../../../../../../form/FormikHelpers";
import React from "react";

interface Props {
  isEdit: boolean;
}

export function BudgetField({ isEdit }: Props) {
  return (
    <Box>
      <Divider textAlign="left" sx={{ fontSize: "24px", mb: 1, mt: 2 }}>
        Budget
      </Divider>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Set a limit on how much your campaign will spend.
      </Typography>
      <Stack direction="column" spacing={5}>
        <FormikTextField
          name="budget"
          label="Lifetime Budget"
          margin="none"
          type="number"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <FormikTextField
          name="dailyBudget"
          label="Daily Budget"
          type="number"
          margin="none"
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />

        <FormikRadioControl
          name="currency"
          label="Currency"
          options={[
            { value: "BAT", label: "BAT" },
            { value: "USD", label: "USD" },
          ]}
          disabled={isEdit}
        />
      </Stack>
    </Box>
  );
}
