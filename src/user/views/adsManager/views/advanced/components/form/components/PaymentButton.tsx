import { FormikSubmitButton, useIsEdit } from "form/FormikHelpers";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";

export function PaymentButton() {
  const { isEdit } = useIsEdit();
  const { values } = useFormikContext<CampaignForm>();
  const paymentText = "Make payment & submit for approval";

  return (
    <FormikSubmitButton
      isCreate={!values.hasPaymentIntent || !isEdit}
      label={
        values.hasPaymentIntent
          ? `${isEdit ? "Update" : "Create"} & Submit For Approval`
          : paymentText
      }
    />
  );
}
