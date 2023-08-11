import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { PaymentMethodField } from "user/views/adsManager/views/advanced/components/campaign/fields/PaymentMethodField";

export function BudgetSettings(props: { isEdit: boolean }) {
  return (
    <>
      <BudgetField isEdit={props.isEdit} />

      <PaymentMethodField isEdit={props.isEdit} />
    </>
  );
}
