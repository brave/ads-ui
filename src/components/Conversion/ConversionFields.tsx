import { Box, List, ListItemText } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "form/FormikHelpers";
import React from "react";

interface Props {
  name: string;
}

export const ConversionFields: React.FC<Props> = ({ name }: Props) => {
  return (
    <>
      <FormikRadioControl
        name={`${name}.type`}
        label="Type"
        options={[
          { value: "postview", label: "Post-View" },
          { value: "postclick", label: "Post-Click" },
        ]}
        helperText={
          <React.Fragment>
            Post-View: Viewed Ad and converted by visiting site on their own.{" "}
            <br />
            Post-Click: Viewed Ad and converted by clicking its link
          </React.Fragment>
        }
      />

      <Box>
        <FormikTextField
          name={`${name}.urlPattern`}
          label="URL Pattern"
          helperText="URL should have a trailing asterisk - Example: https://brave.com/products/*"
        />
      </Box>

      <Box>
        <FormikRadioControl
          name={`${name}.observationWindow`}
          label="Window"
          options={[
            { value: 1, label: "1 Day" },
            { value: 7, label: "7 Days" },
            { value: 30, label: "30 Days" },
          ]}
          helperText="Count conversions within X days of an impression"
        />
      </Box>
    </>
  );
};
