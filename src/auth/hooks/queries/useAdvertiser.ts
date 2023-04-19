import { useAuthContext } from "../../context/auth.hook";
import { IAdvertiser } from "../../context/auth.interface";

export function useAdvertiser() {
  const { advertisers } = useAuthContext();

  const defaultAdvertiser: IAdvertiser = {
    id: "",
    name: "",
    selfServiceCreate: false,
    selfServiceEdit: false,
    selfServiceSetPrice: false,
    publicKey: null,
  };

  const active = window.localStorage.getItem("activeAdvertiser") ?? "";
  const activeAdvertiser = advertisers.find((a) => a.id === active);
  return {
    advertiser: !!activeAdvertiser ? activeAdvertiser : defaultAdvertiser,
    advertisers,
  };
}
