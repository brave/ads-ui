import { buildAdServerEndpoint } from "../../util/environment";

export async function createSession(
  quantity: number,
  advertiserId: string,
  referenceId: string
): Promise<string> {
  const res = await fetch(
    buildAdServerEndpoint("/ads/create-checkout-session"),
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity, advertiserId, referenceId }),
    }
  );

  if (res.status !== 200) {
    throw new Error("cannot create session");
  }

  const { url } = await res.json();
  if (url) {
    return url;
  } else {
    throw Error("no session created");
  }
}
