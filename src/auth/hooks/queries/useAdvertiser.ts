import { useAuthContext } from "auth/context/auth.hook";
import { IAdvertiser } from "auth/context/auth.interface";
import { PaymentType } from "graphql/types";

export function useAdvertiser(): {
  advertiser: IAdvertiser;
  advertisers: IAdvertiser[];
} {
  const { advertisers } = useAuthContext();

  const defaultAdvertiser: IAdvertiser = {
    id: "",
    name: "",
    selfServiceCreate: false,
    selfServiceEdit: false,
    selfServiceSetPrice: false,
    publicKey: null,
    selfServicePaymentType: PaymentType.Stripe,
  };

  const active = window.localStorage.getItem("activeAdvertiser") ?? "";
  const activeAdvertiser = advertisers.find((a) => a.id === active);
  return {
    advertiser: !!activeAdvertiser ? activeAdvertiser : defaultAdvertiser,
    advertisers,
  };
}
