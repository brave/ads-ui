import { FormikSubmitButton, useIsEdit } from "form/FormikHelpers";

export function PaymentButton(props: { hasPaymentIntent: boolean }) {
  const { isEdit } = useIsEdit();
  const paymentText = "Make payment & submit for approval";

  return (
    <FormikSubmitButton
      isCreate={!props.hasPaymentIntent || !isEdit}
      label={
        props.hasPaymentIntent
          ? `${isEdit ? "Update" : "Create"} & Submit For Approval`
          : paymentText
      }
    />
  );
}
