import { Alert, AlertTitle } from "@mui/material";
import { useQueryStringValue } from "@/user/hooks/useQueryStringParams";
import _ from "lodash";
import { CreateSearchCampaign } from "./CreateSearchCampaign";
import { useUser } from "@/auth/hooks/queries/useUser";

// This page is a holding page so we can implement basic functionality
// before we've completed the full flow.

// and as a result it's not worth translating:
/* eslint-disable lingui/no-unlocalized-strings */

export function CreateSearchCampaignBetaPage() {
  const domain = useQueryStringValue("domain");
  const country = useQueryStringValue("country") ?? "us";
  const user = useUser();

  if (!domain || _.isEmpty(domain) || _.isEmpty(country)) {
    return (
      <Alert severity="error">
        <AlertTitle>Missing domain or country</AlertTitle>
        While this page is in early development, please add country= and domain=
        query params to the url.
      </Alert>
    );
  }

  // this is just a UI nicity - actual enforcement of these permissions is
  // is performed server-side
  if (user?.role !== "admin") {
    return (
      <Alert severity="error">
        <AlertTitle>Not Generally Available</AlertTitle>
        While this page is in early development, please login as a user with
        admin permissions.
      </Alert>
    );
  }

  return (
    <CreateSearchCampaign
      key={`${country}:${domain}`}
      domain={{ country, domain }}
    />
  );
}
