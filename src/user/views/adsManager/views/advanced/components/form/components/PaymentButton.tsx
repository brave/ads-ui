import { FormikSubmitButton, useIsEdit } from "form/FormikHelpers";
import { useAdvertiser } from "auth/hooks/queries/useAdvertiser";

export function PaymentButton(props: { hasPaymentIntent: boolean }) {
  const { advertiser } = useAdvertiser();
  const { isEdit } = useIsEdit();
  const paymentText = "Make payment & submit for approval";

  console.log();
  return (
    <FormikSubmitButton
      isCreate={!props.hasPaymentIntent || !isEdit}
      label={
        props.hasPaymentIntent || advertiser.selfServiceSetPrice
          ? `${isEdit ? "Update" : "Create"} & Submit For Approval`
          : paymentText
      }
    />
  );
}
