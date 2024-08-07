import { PropsWithChildren } from "react";
import { Link, Typography } from "@mui/material";
import { Trans } from "@lingui/macro";

export function PrivacyPolicy(props: { isSearch?: boolean }) {
  const PolicyLink = (props: { to: string } & PropsWithChildren) => (
    <Link
      underline="none"
      component="a"
      href={props.to}
      sx={{ cursor: "pointer" }}
      target="_blank"
      rel="noopener"
    >
      {props.children}
    </Link>
  );

  return (
    <Typography variant={props.isSearch ? "caption" : "body2"} flexWrap="wrap">
      <Trans>
        Please see our{" "}
        <PolicyLink to="https://brave.com/advertiser-privacy/">
          Advertiser Privacy Policy
        </PolicyLink>{" "}
        and{" "}
        <PolicyLink
          to={
            props.isSearch
              ? "https://ads-help.brave.com/advertiser-policies/search-terms"
              : "https://basicattentiontoken.org/advertiser-terms-of-service/"
          }
        >
          Terms of Service
        </PolicyLink>{" "}
        applicable to Brave Ads.
      </Trans>
    </Typography>
  );
}
