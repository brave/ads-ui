import { Box } from "@mui/material";
import { FormikRadioControl, FormikTextField } from "form/FormikHelpers";
import { msg, Trans } from "@lingui/macro";
import { useLingui } from "@lingui/react";

interface Props {
  name: string;
}

export const ConversionFields = ({ name }: Props) => {
  const { _ } = useLingui();

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
            Post-View:{" "}
            <Trans>
              Viewed ad and converted by visiting site on their own.
            </Trans>
            <br />
            Post-Click:{" "}
            <Trans>Viewed ad and converted by clicking its link</Trans>
          </>
        }
      />

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
          helperText={_(msg`Count conversions within X days of an impression`)}
        />
      </Box>
    </>
  );
};
