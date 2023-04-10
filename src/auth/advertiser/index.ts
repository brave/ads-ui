import { AdvertiserFragment } from "../../graphql/advertiser.generated";

type Advertiser = Pick<
  AdvertiserFragment,
  | "selfServiceSetPrice"
  | "selfServiceCreate"
  | "selfServiceEdit"
  | "id"
  | "name"
>;

export const getAdvertisers = async (
  id: string,
  accessToken: string
): Promise<Advertiser[]> => {
  const res = await fetch(
    `${import.meta.env.REACT_APP_SERVER_ADDRESS}/advertiser`,
    {
      method: "GET",
      mode: "cors",
      credentials: "same-origin",
      headers: {
        "-x-user": id,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok || res.status !== 200) {
    throw new Error();
  }

  return await res.json();
};
