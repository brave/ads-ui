import { createContext } from "react";
import { CampaignForm } from "user/views/adsManager/types";
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

export const getDraft = (id: string): CampaignForm => {
  const item = localStorage.getItem(id);
  return item ? JSON.parse(item) : null;
};
