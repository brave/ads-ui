import { FormikSubmitButton } from "form/FormikHelpers";
import React from "react";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";
import { PaymentType } from "graphql/types";

export function PaymentButton(props: { isEdit: boolean }) {
  const { values } = useFormikContext<CampaignForm>();
  const hasPaymentIntent =
    values.paymentType !== PaymentType.Stripe || values.stripePaymentId;
  const paymentText = "Make payment & submit for approval";

  return (
    <FormikSubmitButton
      isCreate={!props.isEdit}
      label={
        hasPaymentIntent
          ? `${props.isEdit ? "Update" : "Create"} & Submit For Approval`
          : paymentText
      }
      allowNavigation={true}
    />
  );
}
