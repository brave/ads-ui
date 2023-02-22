import { Box, List, ListItemText } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "../../form/FormikHelpers";
import React from "react";
import { CustomListItemText } from "../List/CustomListItemText";

interface Props {
  idx: number;
}

export const ConversionFields: React.FC<Props> = ({ idx }: Props) => {
  return (
    <>
      <FormikRadioControl
        name={`adSets.${idx}.conversions.0.type`}
        label="Type"
        options={[
          { value: "postview", label: "Post-View" },
          { value: "postclick", label: "Post-Click" },
        ]}
        helperText={
          <List>
            <ListItemText
              secondary="Post-View: Viewed Ad and converted without clicking"
              secondaryTypographyProps={{ fontSize: "0.75rem" }}
            />
            <ListItemText
              secondary="Post-Click: Viewed Ad and converted by clicking"
              secondaryTypographyProps={{ fontSize: "0.75rem" }}
            />
          </List>
        }
      />

      <Box>
        <FormikTextField
          name={`adSets.${idx}.conversions.0.urlPattern`}
          label="URL Pattern"
          helperText="Example: https://brave.com/products/*"
        />
      </Box>

      <Box>
        <FormikRadioControl
          name={`adSets.${idx}.conversions.0.observationWindow`}
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
