import { useFormikContext } from "formik";
import { RegistrationForm } from "auth/registration/types";
import { Typography } from "@mui/material";
import React from "react";
import { FormikTextField } from "form/FormikHelpers";

export function AdvertiserField() {
  const { values } = useFormikContext<RegistrationForm>();

  return (
    <React.Fragment>
      <Typography variant="body1" gutterBottom>
        Welcome to Brave Ads
        {values.firstName && (
          <>
            {", "}
            <strong>{values.firstName}</strong>
          </>
        )}
        {"! "}
        Now we need to know about your organization. Include your organization's
        name and be as descriptive as possible. This will help us expedite the
        review and approval procedures.
      </Typography>

      <FormikTextField
        required
        name="advertiser.name"
        label="Organization Name"
      />

      <FormikTextField
        required
        name="advertiser.url"
        label="Organization URL"
        autoComplete="url"
      />

      <FormikTextField
        required
        name="advertiser.phone"
        label="Organization Phone Number"
        autoComplete="tel"
        type="tel"
      />
    </React.Fragment>
  );
}
