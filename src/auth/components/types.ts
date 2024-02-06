import { AdvertiserBillingAddressFragment } from "graphql/advertiser.generated";

export type AdvertiserForm = {
  tracking: boolean;
  payment: boolean;
  terms: boolean;
  address: {
    street1: string;
    street2?: string | null;
    city: string;
    state: string;
    country: string;
    zipcode: string;
  };
};

type MaybeAddress = AdvertiserBillingAddressFragment;
export const initialAdvertiserForm = (
  paymentAgree: boolean,
  maybeAddress?: MaybeAddress | null,
): AdvertiserForm => ({
  tracking: false,
  payment: paymentAgree,
  terms: false,
  address: {
    street1: maybeAddress?.billingAddress?.street1 ?? "",
    city: maybeAddress?.billingAddress?.city ?? "",
    state: maybeAddress?.billingAddress?.state ?? "",
    country: maybeAddress?.billingAddress?.country ?? "",
    zipcode: maybeAddress?.billingAddress?.zipcode ?? "",
  },
});
