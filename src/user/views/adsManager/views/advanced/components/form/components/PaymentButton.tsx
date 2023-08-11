import { FormikSubmitButton } from "form/FormikHelpers";
import { useFormikContext } from "formik";
import { CampaignForm } from "user/views/adsManager/types";

export function PaymentButton(props: { isEdit: boolean }) {
  const { values } = useFormikContext<CampaignForm>();
  const paymentText = "Make payment & submit for approval";

  return (
    <FormikSubmitButton
      isCreate={!values.hasPaymentIntent || !props.isEdit}
      label={
        values.hasPaymentIntent
          ? `${props.isEdit ? "Update" : "Create"} & Submit For Approval`
          : paymentText
      }
      allowNavigation={true}
    />
  );
}
