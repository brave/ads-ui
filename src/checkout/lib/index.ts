import { buildAdServerEndpoint } from "@/util/environment";
import { PaymentType } from "@/graphql-client/graphql";

export async function createPaymentSession(
  advertiserId: string,
  campaignId: string,
  paymentMethod?: PaymentType,
): Promise<string> {
  const res = await fetch(buildAdServerEndpoint("/payments/checkout-session"), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      advertiserId,
      campaignId,
      paymentMethod: paymentMethod ? paymentMethod.toLowerCase() : undefined,
    }),
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

export async function validatePaymentSession(
  campaignId: string,
  sessionId: string | null,
): Promise<void> {
  const body: { referenceId: string; sessionId?: string } = {
    referenceId: campaignId,
  };
  if (sessionId) {
    body.sessionId = sessionId;
  }

  const res = await fetch(buildAdServerEndpoint("/payments/checkout-session"), {
    method: "PUT",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (res.status !== 200) {
    throw new Error("invalid session");
  }
}

export async function increaseCampaignBudget(
  advertiserId: string,
  campaignId: string,
  amount: string,
): Promise<string> {
  const res = await fetch(
    buildAdServerEndpoint("/payments/checkout-session/increase-budget"),
    {
      method: "POST",
      mode: "cors",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        advertiserId,
        campaignId,
        amount,
      }),
    },
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
