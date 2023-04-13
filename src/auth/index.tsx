import React, { useEffect, useState } from "react";
import {
  IAuthState,
  IAuthProviderProps,
  IJwtPayload,
  IAdvertiser,
} from "auth/context/auth.interface";
import { initialState, IAuthContext } from "auth/context/auth.state";
import jwt_decode from "jwt-decode";
import { isBefore } from "date-fns";
import { getAdvertisers } from "./advertiser";
import _ from "lodash";

export const IAuthProvider: React.FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  const [state, setState] = useState<IAuthState>(initialState);
  const [loading, setLoading] = useState(false);

  const getJwt = () => {
    const cJwt = document.cookie
      .split(";")
      .find((c) => c.trim().includes("jwt="));
    return cJwt ? cJwt.split("=")[1] : "";
  };

  const setActiveAdvertiser = (advertiser?: IAdvertiser) => {
    if (advertiser) {
      window.localStorage.setItem(
        "activeAdvertiser",
        JSON.stringify(advertiser)
      );

      setState((cur) => ({
        ...cur,
        advertiser,
      }));
    }
  };

  const getActiveAdvertiser = (): IAdvertiser | null => {
    const adv = window.localStorage.getItem("activeAdvertiser");

    if (adv) {
      const parsed = JSON.parse(adv);
      return { ...parsed };
    }

    return null;
  };

  const onTokenExpire = () => {
    document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
    localStorage.removeItem("user");
    window.location.reload();
  };

  const setAccessToken = (token?: string) => {
    setState((cur) => ({
      ...cur,
      isAuthenticated: !!token,
      accessToken: token ?? "",
    }));

    if (!!token) {
      parseToken(token);
    } else {
      document.cookie = "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
      localStorage.removeItem("user");
    }
  };

  const parseToken = (tk: string) => {
    const { exp, emailVerified, email, role, id } = jwt_decode<IJwtPayload>(tk);
    if (exp) {
      const expInMillis = exp * 1000;
      const now = new Date();
      if (!isBefore(new Date(expInMillis), now)) {
        const user = { emailVerified, email, role, userId: id };
        localStorage.setItem("user", JSON.stringify(user));
        advertiser(id ?? "", tk).finally(() => {
          setState((cur) => ({
            ...cur,
            ...user,
          }));
        });
      } else {
        onTokenExpire();
      }
    }
  };

  const advertiser = (userId: string, token: string | null) => {
    setLoading(true);
    return getAdvertisers(userId, token ?? "")
      .then((a) => {
        const storageAdvertiser = getActiveAdvertiser();
        let isInGroup = false;
        if (storageAdvertiser != null) {
          isInGroup = _.some(a, { id: storageAdvertiser.id });
        }

        const activeAdvertiser = isInGroup
          ? storageAdvertiser
          : a.find((adv) => adv.state === "active");

        const hasAdvertiser = activeAdvertiser != null;
        if (hasAdvertiser) {
          setActiveAdvertiser(activeAdvertiser);
          setState((cur) => ({
            ...cur,
            advertiser: activeAdvertiser,
          }));
        } else {
          document.cookie =
            "jwt=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
          localStorage.removeItem("user");
        }

        setState((cur) => ({
          ...cur,
          accessToken: hasAdvertiser ? token ?? "" : "",
          isAuthenticated: hasAdvertiser && token != null,
        }));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    // For each time a user refreshes (or lands on login for first time), check if their token is still valid
    const sessionToken = getJwt();
    const storageUser = localStorage.getItem("user");

    if (sessionToken) {
      parseToken(sessionToken);
    }

    const userId = storageUser ? JSON.parse(storageUser).userId : "";
    advertiser(userId, sessionToken)
      .catch((e) => {
        console.error("unable to login");
      })
      .finally(() => {
        setState((cur) => ({
          ...cur,
          setAccessToken: setAccessToken,
          isInitialized: true,
          setActiveAdvertiser: setActiveAdvertiser,
        }));
      });
  }, []);

  return (
    <IAuthContext.Provider value={state}>
      {!loading && <>{children}</>}
    </IAuthContext.Provider>
  );
};
