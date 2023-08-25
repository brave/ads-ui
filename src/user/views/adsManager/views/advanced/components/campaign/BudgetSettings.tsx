import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { PaymentMethodField } from "user/views/adsManager/views/advanced/components/campaign/fields/PaymentMethodField";

export function BudgetSettings() {
  return (
    <>
      <BudgetField />

      <PaymentMethodField />
    </>
  );
}
