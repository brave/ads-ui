import { Box, List, ListItemText, TextField } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "../../form/FormikHelpers";
import React from "react";
import { useField, useFormikContext } from "formik";
import { CampaignForm } from "../../user/views/adsManager/types";

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
          <List>
            <ListItemText
              secondary="Post-View: Viewed Ad and converted by visiting site on their own"
              secondaryTypographyProps={{ fontSize: "0.75rem" }}
            />
            <ListItemText
              secondary="Post-Click: Viewed Ad and converted by clicking its link"
              secondaryTypographyProps={{ fontSize: "0.75rem" }}
            />
          </List>
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
