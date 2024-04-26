import { AdvertiserBillingAddressFragment } from "@/graphql-client/graphql";

export type AdvertiserForm = {
  tracking: boolean;
  payment: boolean;
  terms: boolean;
  language: boolean;
  address: {
    id?: string | null;
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
): AdvertiserForm => {
  return {
    tracking: false,
    payment: paymentAgree,
    terms: false,
    language: false,
    address: {
      id: maybeAddress?.billingAddress?.id ?? null,
      street1: maybeAddress?.billingAddress?.street1 ?? "",
      city: maybeAddress?.billingAddress?.city ?? "",
      state: maybeAddress?.billingAddress?.state ?? "",
      country: maybeAddress?.billingAddress?.country ?? "",
      zipcode: maybeAddress?.billingAddress?.zipcode ?? "",
    },
  };
};
