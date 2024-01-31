import { Link, Stack, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { FormikCheckbox } from "form/FormikHelpers";
import { useLingui } from "@lingui/react";
import { msg, Trans } from "@lingui/macro";

export function MarketingOptIn() {
  const { _ } = useLingui();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const PolicyLink = (props: { title: string; to: string }) => (
    <Link
      to={props.to}
      underline="none"
      variant="inherit"
      rel="noreferrer"
      target="_blank"
      component={RouterLink}
    >
      {props.title}
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
          Please see our Advertiser Privacy Policy and Terms of Service
          applicable to Brave Ads
        </Trans>
        {/*  */}
        {/*  Please see our{" "}*/}
        {/*  <PolicyLink*/}
        {/*    title="Advertiser Privacy Policy"*/}
        {/*    to="https://brave.com/advertiser-privacy/"*/}
        {/*  />{" "}*/}
        {/*  and{" "}*/}
        {/*  <PolicyLink*/}
        {/*    title="Terms of Service"*/}
        {/*    to="https://basicattentiontoken.org/advertiser-terms-of-service/"*/}
        {/*  />{" "}*/}
        {/*  applicable to Brave Ads*/}
      </Typography>
    </Stack>
  );
}
