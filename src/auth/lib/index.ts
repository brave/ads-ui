import { UserFragment } from "graphql/user.generated";
import { AdvertiserFragment } from "graphql/advertiser.generated";

const url = import.meta.env.REACT_APP_SERVER_ADDRESS.replace("v1", "v2");

export type Advertiser = Pick<
  AdvertiserFragment,
  | "selfServiceSetPrice"
  | "selfServiceCreate"
  | "selfServiceEdit"
  | "id"
  | "name"
  | "publicKey"
>;

export type ResponseUser = UserFragment & { advertisers: Advertiser[] };

export const getCredentials = async (user: {
  email: string;
  password: string;
}): Promise<ResponseUser> => {
  const res = await fetch(`${url}/auth/token`, {
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
    throw new Error("The username or password did not match our records.");
  }

  if (!res.ok) {
    throw new Error(
      "Unexpected error validating your credentials. Please try again later."
    );
  }

  return await res.json();
};

export const getUser = async (): Promise<ResponseUser> => {
  const res = await fetch(`${url}/auth/user`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Invalid Session");
  }

  return await res.json();
};

export const clearCredentials = async (): Promise<void> => {
  const res = await fetch(`${url}/auth/logout`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Could not logout at this time. Please try again later.");
  }

  return;
};

export const getLink = async (user: { email: string }): Promise<void> => {
  const res = await fetch(`${url}/auth/magic-link?email=${user.email}`, {
    method: "GET",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (res.status !== 201) {
    throw new Error("unable to request secure login link");
  }

  return;
};
