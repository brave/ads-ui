import { FormikCheckbox } from "@/form/FormikHelpers";
import { Box } from "@mui/material";

export function MarketingOptIn() {
  return (
    <Box mt={2}>
      <FormikCheckbox
        name="marketingOptIn"
        label="I would like to receive marketing emails about new features and promotions from Brave Ads"
        labelVariant="caption"
        sx={{
          m: 0,
        }}
      />
    </Box>
  );
}
