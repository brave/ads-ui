import { FormikCheckbox } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";
import { Box } from "@mui/material";

export function MarketingOptIn() {
  const { _ } = useLingui();

  return (
    <Box mt={2}>
      <FormikCheckbox
        name="marketingOptIn"
        label={_(
          msg`I would like to receive marketing emails about new features and promotions from Brave Ads`,
        )}
        labelVariant="caption"
        sx={{
          m: 0,
        }}
      />
    </Box>
  );
}
