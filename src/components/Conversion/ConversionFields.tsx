import { Box } from "@mui/material";
import {FormikRadioControl, FormikTextField} from "../../form/FormikHelpers";
import React from "react";

interface Props {
  idx: number
}

export const ConversionFields: React.FC<Props> = ({ idx }: Props) => {
  return (
    <>
      <FormikRadioControl
        name={`adSets.${idx}.conversions[0].type`}
        label="Type"
        options={[
          { value: "postview", label: "Post-View" },
          { value: "postclick", label: "Post-Click" },
        ]}
      />

      <Box>
        <FormikTextField
          name={`adSets.${idx}.conversions[0].urlPattern`}
          label="URL Pattern"
          helperText="Example: https://brave.com/products/*"
        />
      </Box>

      <Box>
        <FormikRadioControl
          name={`adSets.${idx}.conversions[0].observationWindow`}
          label="Window"
          options={[
            { value: "1", label: "1 Day" },
            { value: "7", label: "7 Days" },
            { value: "30", label: "30 Days" },
          ]}
          helperText="Count conversions within X days of an impression"
        />
      </Box>
    </>
  );
};
