import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormikCheckbox } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";
import { PropsWithChildren } from "react";

export function MarketingOptIn() {
  const { _ } = useLingui();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PolicyLink = (props: { to: string } & PropsWithChildren) => (
    <Link
      to={props.to}
      underline="none"
      variant="inherit"
      rel="noreferrer"
      target="_blank"
      component={RouterLink}
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
