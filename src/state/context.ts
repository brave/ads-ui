import { createContext } from "react";
import { IAdvertiser } from "../actions";
import { CampaignForm } from "../user/views/adsManager/types";
import _ from "lodash";
import moment from "moment";

export const DraftContext = createContext({
  drafts: [] as CampaignForm[],
  setDrafts: () => {},
});

export const getAllDrafts = () => {
  const campaigns: CampaignForm[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && moment(new Date(Number(key))).isValid()) {
      const campaign = localStorage.getItem(key);
      if (campaign) {
        campaigns.push(JSON.parse(campaign));
      }
    }
  }

  return campaigns;
};

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
