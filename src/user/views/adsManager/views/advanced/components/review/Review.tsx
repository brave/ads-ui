import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../types";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { FormikSubmitButton } from "../../../../../../../form/FormikHelpers";
import { CampaignReview } from "./components/CampaignReview";
import { AdSetReview } from "./components/AdSetReview";

interface Props {
  isEdit: boolean;
}

export function Review({ isEdit }: Props) {
  const { values, errors, setTouched } = useFormikContext<CampaignForm>();

  useEffect(() => {
    const toTouch = Object.keys(values)
      .map((v) => ({ [`${v}`]: true }))
      .reduce((a, b) => ({ ...a, ...b }));
    setTouched(toTouch, false);
  }, [values]);

  return (
    <Box display="flex" flexDirection="column">
      <CampaignReview values={values} errors={errors} />

      {values.adSets.map((adSet, adSetIdx) => (
        <AdSetReview
          idx={adSetIdx}
          adSet={adSet}
          errors={errors.adSets?.[adSetIdx]}
        />
      ))}

      <FormikSubmitButton
        isCreate={!isEdit}
        label={isEdit ? "Update Campaign" : "Publish Campaign"}
        allowNavigation={true}
      />
    </Box>
  );
}
