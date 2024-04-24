import { useIsEdit } from "@/form/FormikHelpers";
import { useAdvertiser } from "@/auth/hooks/queries/useAdvertiser";
import { FormikSubmitButton } from "@/form/FormikButton";
import { msg } from "@lingui/macro";

export function PaymentButton(props: { hasPaymentIntent: boolean }) {
  const { advertiser } = useAdvertiser();
  const { isEdit } = useIsEdit();
  const paymentText = msg`Make payment & submit for approval`;

  return (
    <FormikSubmitButton
      isCreate={!props.hasPaymentIntent || !isEdit}
      label={
        props.hasPaymentIntent || advertiser.selfServiceSetPrice
          ? isEdit
            ? msg`Update & Submit For Approval`
            : msg`Create & Submit For Approval`
          : paymentText
      }
    />
  );
}
