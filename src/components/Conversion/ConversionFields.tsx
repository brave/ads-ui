import { Box } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "form/FormikHelpers";

interface Props {
  name: string;
}

export const ConversionFields = ({ name }: Props) => {
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
          <>
            Post-View: Viewed ad and converted by visiting site on their own.{" "}
            <br />
            Post-Click: Viewed ad and converted by clicking its link
          </>
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
