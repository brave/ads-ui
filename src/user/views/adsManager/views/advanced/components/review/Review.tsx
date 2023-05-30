import { useFormikContext } from "formik";
import { CampaignForm } from "../../../../types";
import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { FormikSubmitButton } from "form/FormikHelpers";
import { CampaignReview } from "./components/CampaignReview";
import { AdSetReview } from "./components/AdSetReview";
import { PaymentType } from "graphql/types";

interface Props {
  isEdit: boolean;
}

export function Review({ isEdit }: Props) {
  const { values, errors, setTouched } = useFormikContext<CampaignForm>();
  const hasPaymentIntent =
    values.paymentType !== PaymentType.Stripe || values.stripePaymentId;
  const paymentText = "Make payment & submit for approval";

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
        label={
          hasPaymentIntent
            ? `${isEdit ? "Update" : "Create"} & Submit For Approval`
            : paymentText
        }
        allowNavigation={true}
      />
    </Box>
  );
}
