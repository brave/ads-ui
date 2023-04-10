import React, { useEffect, useState } from "react";
import {
  IAuthState,
  IAuthProviderProps,
  IJwtPayload,
} from "auth/context/auth.interface";
import { initialState, IAuthContext } from "auth/context/auth.state";
import jwt_decode from "jwt-decode";
import { isBefore } from "date-fns";
import { IAdvertiser } from "../actions";
import { AdvertiserFragment } from "../graphql/advertiser.generated";
import { getActiveAdvertiser } from "../state/context";
import _ from "lodash";

export const IAuthProvider: React.FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  const [state, setState] = useState<IAuthState>(initialState);

  const setActiveAdvertiser = (advertiser?: IAdvertiser) => {
    if (advertiser) {
      window.localStorage.setItem(
        "activeAdvertiser",
        JSON.stringify(advertiser)
      );
    }
  };

  const setAccessToken = (token?: string) => {
    setState((cur) => ({
      ...cur,
      isAuthenticated: !!token,
      accessToken: token ?? "",
    }));

    if (!!token) {
      localStorage.setItem("accessToken", token);
      parseToken(token);
    } else {
      localStorage.removeItem("accessToken");
    }
  };

  const onTokenExpire = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };

  const parseToken = (tk: string) => {
    const { exp, emailVerified, email, role, id } = jwt_decode<IJwtPayload>(tk);
    if (exp) {
      const expInMillis = exp * 1000;
      const now = new Date();
      if (!isBefore(new Date(expInMillis), now)) {
        setState((cur) => ({
          ...cur,
          emailVerified,
          email,
          role,
          userId: id,
        }));
      } else {
        onTokenExpire();
      }
    }
  };

  useEffect(() => {
    // For each time a user refreshes (or lands on login for first time), check if their token is still valid
    const sessionToken = localStorage.getItem("accessToken");

    if (sessionToken) {
      parseToken(sessionToken);
    }

    // TODO: need the advertiser
    // const storageAdvertiser = getActiveAdvertiser();
    // let isInGroup = false;
    // if (storageAdvertiser) {
    //   isInGroup = _.some(advertisers, { id: storageAdvertiser.id });
    // }
    //
    // const activeAdvertiser = isInGroup
    //   ? storageAdvertiser
    //   : _.find(advertisers, { state: "active" });

    setState((cur) => ({
      ...cur,
      accessToken: sessionToken ?? "",
      isAuthenticated: sessionToken !== null,
      setAccessToken: setAccessToken,
      isInitialized: true,
      setActiveAdvertiser: setActiveAdvertiser,
    }));
  }, []);

  return (
    <IAuthContext.Provider value={state}>{children}</IAuthContext.Provider>
  );
};
