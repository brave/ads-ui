import { InputAdornment } from "@mui/material";
import { FormikTextField, useIsEdit } from "form/FormikHelpers";
import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../../types";
import { useAdvertiserWithPrices } from "user/hooks/useAdvertiserWithPrices";

export function BudgetField() {
  const { isDraft } = useIsEdit();
  const { data } = useAdvertiserWithPrices();
  const { values, errors } = useFormikContext<CampaignForm>();

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
      helperText={errors.budget}
      error={!!errors.budget}
      disabled={!isDraft && !data.selfServiceSetPrice}
    />
  );
}
