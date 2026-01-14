import { PropsWithChildren } from "react";
import { Link, Typography } from "@mui/material";

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

export function PrivacyPolicy(props: { isSearch?: boolean }) {
  return (
    <Typography variant={props.isSearch ? "caption" : "body2"} flexWrap="wrap">
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
    </Typography>
  );
}
