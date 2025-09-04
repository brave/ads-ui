import { useEffect, useState } from "react";
import {
  IAdvertiser,
  IAuthProviderProps,
  IAuthState,
} from "@/auth/context/auth.interface";
import { IAuthContext, initialState } from "@/auth/context/auth.state";
import { getUser, ResponseUser } from "./lib";
import _ from "lodash";
import { setActiveAdvertiser } from "./util";

export const IAuthProvider = ({ children }: IAuthProviderProps) => {
  const [state, setState] = useState<IAuthState>(initialState);
  const [loading, setLoading] = useState(false);

  const getActiveAdvertiser = (
    advertisers: IAdvertiser[],
  ): IAdvertiser | undefined => {
    const advertiserId = window.localStorage.getItem("activeAdvertiser");
    if (advertisers.length === 0) {
      return undefined;
    }

    let isInGroup = false;
    if (advertiserId != null) {
      isInGroup = _.some(advertisers, { id: advertiserId });
    }

    return isInGroup
      ? advertisers.find((a) => a.id === advertiserId)
      : advertisers[0];
  };

  const setSessionUser = (u?: ResponseUser) => {
    if (u) {
      const active = getActiveAdvertiser(u.advertisers);
      setActiveAdvertiser(active?.id);
      setState((cur) => ({
        ...cur,
        email: u.email,
        role: u.role,
        userId: u.id,
        fullName: u.fullName,
        advertisers: u.advertisers,
        isAuthenticated: u.advertisers.length > 0 && !!active,
        advertiserMessage: u.message,
      }));
    } else {
      setState((cur) => ({
        ...cur,
        isAuthenticated: false,
      }));
    }
  };

  useEffect(() => {
    // For each time a user refreshes (or lands on login for first time), check if their token is still valid
    setLoading(true);
    getUser()
      .then(async (res) => {
        setSessionUser(res);
      })
      .catch((e) => {
        console.error(e);
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
        }));
      });
  }, []);

  return (
    <IAuthContext.Provider value={state}>
      {!loading && <>{children}</>}
    </IAuthContext.Provider>
  );
};
