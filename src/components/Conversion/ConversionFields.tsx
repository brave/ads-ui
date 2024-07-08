import { Box, Typography } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "@/form/FormikHelpers";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";
import { LearnMoreButton } from "@/components/Button/LearnMoreButton";

interface Props {
  name: string;
}

export const ConversionFields = ({ name }: Props) => {
  const { _ } = useLingui();

  return (
    <>
      <Box>
        <FormikTextField
          name={`${name}.urlPattern`}
          label={_(msg`URL Pattern`)}
          helperText={_(
            msg`URL should have a trailing asterisk - Example: https://brave.com/products/*`,
          )}
        />
      </Box>

      <Box>
        <FormikRadioControl
          name={`${name}.observationWindow`}
          label={_(msg`Observation Window`)}
          options={[
            { value: 1, label: _(msg`1 Day`) },
            { value: 7, label: _(msg`7 Days`) },
            { value: 30, label: _(msg`30 Days`) },
          ]}
          helperText={
            <Typography variant="body2" sx={{ mb: 2 }}>
              <Trans>
                Define the number of days Brave will observe conversions and
                attribute them to the campaign.
              </Trans>{" "}
              <LearnMoreButton helpSection="campaign-performance/reporting/#advanced-controls-for-attribution" />
            </Typography>
          }
        />
      </Box>
    </>
  );
};
