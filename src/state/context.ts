import dayjs from "dayjs";
import { createContext } from "react";
import { CampaignForm } from "user/views/adsManager/types";

export const DraftContext = createContext({
  drafts: [] as CampaignForm[],
  setDrafts: () => {},
});

export const getAllDrafts = () => {
  const advertiserId = window.localStorage.getItem("activeAdvertiser");
  const campaigns: CampaignForm[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && dayjs(Number(key)).isValid()) {
      const campaign = localStorage.getItem(key);
      if (campaign) {
        const parsed: CampaignForm = JSON.parse(campaign);
        if (parsed.advertiserId === advertiserId) {
          campaigns.push(JSON.parse(campaign));
        }
      }
    }
  }

  return campaigns;
};

export const FilterContext = createContext({
  fromDate: null as Date | null,
  setFromDate: (_d: Date | null) => {},
});

export const FormContext = createContext({
  isShowingAds: false as boolean,
  setIsShowingAds: (_b: boolean) => {},
});
