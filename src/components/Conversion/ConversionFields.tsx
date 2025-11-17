import { Box, Typography } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "@/form/FormikHelpers";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";

interface Props {
  name: string;
}

export const ConversionFields = ({ name }: Props) => {
  return (
    <>
      <Box>
        <FormikTextField
          name={`${name}.urlPattern`}
          label={"URL Pattern"}
          helperText="URL should have a trailing asterisk - Example: https://brave.com/products/*"
        />
      </Box>

      <Box>
        <FormikRadioControl
          name={`${name}.observationWindow`}
          label={"Observation Window"}
          options={[
            { value: 1, label: "1 Day" },
            { value: 7, label: "7 Days" },
            { value: 30, label: "30 Days" },
          ]}
          helperText={
            <Typography variant="body2" sx={{ mb: 2 }}>
              Define the number of days Brave will observe conversions and
              attribute them to the campaign.{" "}
              <LearnMoreButton helpSection="campaign-performance/reporting/#advanced-controls-for-attribution" />
            </Typography>
          }
        />
      </Box>
    </>
  );
};
