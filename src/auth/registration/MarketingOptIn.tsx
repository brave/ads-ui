import { Link, Stack, Typography } from "@mui/material";
import { FormikCheckbox } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";
import { PropsWithChildren } from "react";

export function MarketingOptIn() {
  const { _ } = useLingui();
  const PolicyLink = (props: { to: string } & PropsWithChildren) => (
    <Link
      underline="none"
      sx={{ cursor: "pointer" }}
      onClick={() => {
        window.open(`${props.to}`, "__blank", "noopener");
      }}
    >
      {props.children}
    </Link>
  );

  return (
    <Stack mt={1}>
      <FormikCheckbox
        name="marketingOptIn"
        label={_(
          msg`I would like to receive marketing emails about new features and promotions from Brave Ads`,
        )}
      />
      <Typography variant="body2">
        <Trans>
          Please see our{" "}
          <PolicyLink to="https://brave.com/advertiser-privacy/">
            Advertiser Privacy Policy
          </PolicyLink>{" "}
          and{" "}
          <PolicyLink to="https://basicattentiontoken.org/advertiser-terms-of-service/">
            Terms of Service
          </PolicyLink>{" "}
          applicable to Brave Ads
        </Trans>
      </Typography>
    </Stack>
  );
}
