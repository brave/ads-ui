import { BudgetField } from "user/views/adsManager/views/advanced/components/campaign/fields/BudgetField";
import { PaymentMethodField } from "user/views/adsManager/views/advanced/components/campaign/fields/PaymentMethodField";
import { AdvertiserPriceFragment } from "graphql/advertiser.generated";

export function BudgetSettings(props: { prices: AdvertiserPriceFragment[] }) {
  return (
    <>
      <BudgetField prices={props.prices} />

      <PaymentMethodField />
    </>
  );
}
