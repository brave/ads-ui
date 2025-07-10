import { PaymentType, UserFragment } from "@/graphql-client/graphql";
import {
  buildAdServerEndpoint,
  buildAdServerV2Endpoint,
} from "@/util/environment";
import { RegistrationForm } from "@/auth/registration/types";
import { t } from "@lingui/macro";

type Advertiser = {
  selfServiceSetPrice: boolean;
  selfServiceManageCampaign: boolean;
  id: string;
  name: string;
  publicKey: string;
  selfServicePaymentType: PaymentType;
};

export type ResponseUser = UserFragment & { advertisers: Advertiser[] };

export const getCredentials = async (user: {
  email: string;
  password: string;
}): Promise<ResponseUser> => {
  if (user.email === "" || user.password === "") {
    throw new Error(t`Please enter a username and password`);
  }

  const res = await fetch(buildAdServerV2Endpoint("/auth/token"), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: user.email,
      password: user.password,
    }),
  });

  if (res.status === 400 || res.status === 401) {
    throw new Error(t`The username or password did not match our records.`);
  }

  if (!res.ok) {
    throw new Error(
      t`Unexpected error validating your credentials. Please try again later.`,
    );
  }

  return await res.json();
};

export async function submitRegistration(
  form: RegistrationForm,
  type: "search" | "browser",
) {
  const path = type === "search" ? "/register/search" : "/register";
  const body = {
    advertiser: {
      billingEmail: form.user.email,
      name: form.advertiser.name,
      url: form.advertiser.url,
      description: form.advertiser.description,
      marketingChannel:
        form.advertiser.marketingChannel === "other"
          ? `other: ${form.advertiser.other}`
          : form.advertiser.marketingChannel,
      vertical: form.advertiser.vertical,
    },
    user: form.user,
    country: form.country,
    mediaSpend: form.mediaSpend,
  };

  if (type === "browser") {
    (body.advertiser as any)["vertical"] =
      form.advertiser.vertical === "Other"
        ? undefined
        : form.advertiser.vertical;
  }

  const res = await fetch(buildAdServerEndpoint(path), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    throw new Error(
      t`Unable to register your organization at this time. Please try again later.`,
    );
  }
}

export const getUser = async (): Promise<ResponseUser> => {
  const res = await fetch(buildAdServerV2Endpoint("/auth/user"), {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(t`Invalid Session`);
  }

  return await res.json();
};

export const clearCredentials = async (): Promise<void> => {
  const res = await fetch(buildAdServerV2Endpoint("/auth/logout"), {
    method: "GET",
    mode: "cors",
    credentials: "include",
  });

  if (!res.ok) {
    throw new Error(t`Could not logout at this time. Please try again later.`);
  }

  return;
};

export const getLink = async (user: { email: string }): Promise<void> => {
  await fetch(buildAdServerV2Endpoint(`/auth/magic-link`), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: user.email.trim() }),
  });
};

export const authorize = async (req: {
  code: string;
  id: string;
}): Promise<ResponseUser> => {
  const res = await fetch(buildAdServerV2Endpoint(`/auth/authorize`), {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code: req.code, id: req.id }),
  });

  if (!res.ok) {
    throw new Error(t`Invalid Token`);
  }

  return await res.json();
};

export const sendMarketingEmail = async (req: {
  email: string;
  fullName: string;
}) => {
  const response = await fetch(
    "https://newsletter.brave.app/members/api/send-magic-link/",
    {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: req.email,
        name: req.fullName,
        // eslint-disable-next-line lingui/no-unlocalized-strings
        newsletters: [{ name: "Brave Ads" }],
      }),
    },
  );

  return await response.json();
};
