import { FormikCheckbox } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg } from "@lingui/macro";

export function MarketingOptIn() {
  const { _ } = useLingui();

  return (
    <FormikCheckbox
      name="marketingOptIn"
      label={_(
        msg`I would like to receive marketing emails about new features and promotions from Brave Ads`,
      )}
    />
  );
}
