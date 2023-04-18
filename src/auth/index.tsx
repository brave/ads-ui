import React, { useEffect, useState } from "react";
import {
  IAuthState,
  IAuthProviderProps,
  IAdvertiser,
} from "auth/context/auth.interface";
import { initialState, IAuthContext } from "auth/context/auth.state";
import { getAdvertisers } from "./advertiser";
import _ from "lodash";
import { clearCredentials, getUser } from "./util";
import { UserFragment } from "../graphql/user.generated";

export const IAuthProvider: React.FC<IAuthProviderProps> = ({
  children,
}: IAuthProviderProps) => {
  const [state, setState] = useState<IAuthState>(initialState);
  const [loading, setLoading] = useState(false);

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

  const setSessionUser = (u?: UserFragment) => {
    if (u) {
      setLoading(true);
      setState((cur) => ({
        ...cur,
        email: u.email,
        emailVerified: u.emailVerified,
        role: u.role,
        userId: u.id,
      }));

      advertiser(u.id).finally(() => {
        setLoading(false);
      });
    } else {
      setState((cur) => ({
        ...cur,
        isAuthenticated: false,
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

  const advertiser = (userId: string) => {
    return getAdvertisers(userId)
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
          void clearCredentials();
        }

        setState((cur) => ({
          ...cur,
          isAuthenticated: hasAdvertiser,
        }));
      })
      .catch(() => {
        setState((cur) => ({
          ...cur,
          isAuthenticated: false,
        }));
      });
  };

  useEffect(() => {
    // For each time a user refreshes (or lands on login for first time), check if their token is still valid
    const storageUser = localStorage.getItem("user");
    const userId = storageUser ? JSON.parse(storageUser).userId : "";
    setLoading(true);
    getUser()
      .then(async (res) => {
        setState((cur) => ({
          ...cur,
          email: res.email,
          emailVerified: res.emailVerified,
          role: res.role,
          userId: res.id,
        }));

        return await advertiser(userId);
      })
      .catch(() => {
        setState((cur) => ({
          ...cur,
          isAuthenticated: false,
        }));
      })
      .finally(() => {
        setLoading(false);
        setState((cur) => ({
          ...cur,
          isInitialized: true,
          setSessionUser,
          setActiveAdvertiser,
        }));
      });
  }, []);

  return (
    <IAuthContext.Provider value={state}>
      {!loading && <>{children}</>}
    </IAuthContext.Provider>
  );
};
