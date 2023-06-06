import { buildAdServerEndpoint } from "util/environment";

export async function createPaymentSession(
  advertiserId: string,
  campaignId: string
): Promise<string> {
  const res = await fetch(buildAdServerEndpoint("/ads/checkout-session"), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ advertiserId, campaignId }),
  });

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

export async function fetchPaymentSession(
  sessionId: string,
  campaignId: string
): Promise<void> {
  const res = await fetch(
    buildAdServerEndpoint(
      `/ads/checkout-session?sessionId=${sessionId}&referenceId=${campaignId}`
    ),
    {
      method: "PUT",
      mode: "cors",
      credentials: "include",
    }
  );

  if (res.status !== 200) {
    throw new Error("invalid session");
  }
}
