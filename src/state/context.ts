import { createContext } from "react";
import { IAdvertiser } from "../actions";

export const DraftContext = createContext({
  drafts: 0,
  setDrafts: (n: number) => {},
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
