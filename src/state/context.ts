import React from "react";
import { IAdvertiser } from "../actions";

export default React.createContext({
  loading: undefined,
  sidebar: "visible",
  setLoading: (loading) => {},
  setSidebar: (sidebar) => {},
});

export const setActiveAdvertiser = (advertiser: IAdvertiser) => {
  window.localStorage.setItem("activeAdvertiser", JSON.stringify(advertiser));
};

export const getActiveAdvertiser = (): IAdvertiser | null => {
  const adv = window.localStorage.getItem("activeAdvertiser");

  if (adv) {
    const parsed = JSON.parse(adv);
    return { ...parsed };
  }

  return null;
};
