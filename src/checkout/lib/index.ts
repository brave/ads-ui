import { buildAdServerEndpoint } from "util/environment";

export async function createPaymentSession(
  advertiserId: string,
  campaignId: string,
): Promise<string> {
  const res = await fetch(buildAdServerEndpoint("/payments/checkout-session"), {
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
  campaignId: string,
  sessionId: string | null,
): Promise<void> {
  let baseUrl = `/payments/checkout-session?referenceId=${campaignId}`;
  if (sessionId) {
    baseUrl = `${baseUrl}&sessionId=${sessionId}`;
  }

  const res = await fetch(buildAdServerEndpoint(baseUrl), {
    method: "PUT",
    mode: "cors",
    credentials: "include",
  });

  if (res.status !== 200) {
    throw new Error("invalid session");
  }
}
