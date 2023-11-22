import {
  FormikRadioControl,
  FormikTextField,
  useIsEdit,
} from "form/FormikHelpers";
import { useField } from "formik";
import { CampaignFormat } from "graphql/types";
import { InputAdornment, Stack } from "@mui/material";
import { uiLabelsForBillingType } from "util/billingType";

export function CustomPriceSelect() {
  const { isDraft } = useIsEdit();
  const [, format] = useField<CampaignFormat>("format");

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <FormikTextField
        fullWidth={false}
        name="price"
        label="Price"
        type="number"
        growInput={false}
        InputProps={{
          startAdornment: <InputAdornment position="start">$</InputAdornment>,
        }}
        disabled={!isDraft}
        margin="dense"
      />
      <FormikRadioControl
        label="Billing Type"
        name="billingType"
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
        disabled={!isDraft || format.value === CampaignFormat.NewsDisplayAd}
      />
    </Stack>
  );
}
