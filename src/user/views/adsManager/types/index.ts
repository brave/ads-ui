import {
  CampaignFormat,
  CampaignPacingStrategies,
} from "../../../../graphql/types";
import {
  defaultEndDate,
  defaultStartDate,
} from "../../../../form/DateFieldHelpers";
import { MIN_PER_CAMPAIGN } from "../../../../validation/CampaignSchema";

export type Billing = "cpm" | "cpc";

export type CampaignForm = {
  startAt: string;
  endAt: string;
  budget: number;
  validateStart: boolean;
  currency: string;
  dailyBudget: number;
  dailyCap: number;
  geoTargets: GeoTarget[];
  adSets: AdSetForm[];
  format: CampaignFormat;
  name: string;
  state: string;
  type: "paid";
  price: number;
  billingType: Billing;
  pacingStrategy: CampaignPacingStrategies;
};

export type GeoTarget = {
  code: string;
  name: string;
};

export type OS = {
  code: string;
  name: string;
};

export type AdSetForm = {
  id?: string;
  name: string;
  segments: Segment[];
  oses: OS[];
  conversions: Conversion[];
  creatives: Creative[];
};

export type Conversion = {
  type: string;
  observationWindow: number;
  urlPattern: string;
};

export type Segment = {
  code: string;
  name: string;
};

export type Creative = {
  id?: string;
  name: string;
  title: string;
  body: string;
  targetUrl: string;
  targetUrlValid?: boolean;
  state?: string;
  creativeInstanceId?: string;
};

export const initialConversion: Conversion = {
  type: "",
  urlPattern: "",
  observationWindow: 0,
};

export const initialCreative: Creative = {
  name: "",
  title: "",
  body: "",
  targetUrl: "",
};

export const initialAdSet: AdSetForm = {
  name: "",
  segments: [
    {
      code: "Svp7l-zGN",
      name: "untargeted",
    },
  ],
  conversions: [],
  oses: [],
  creatives: [
    {
      ...initialCreative,
    },
  ],
};

export const initialCampaign: CampaignForm = {
  startAt: defaultStartDate(),
  endAt: defaultEndDate(),
  validateStart: true,
  budget: MIN_PER_CAMPAIGN,
  currency: "USD",
  dailyBudget: MIN_PER_CAMPAIGN,
  dailyCap: 1,
  geoTargets: [],
  billingType: "cpm",
  price: 6,
  adSets: [
    {
      ...initialAdSet,
    },
  ],
  format: CampaignFormat.PushNotification,
  name: "",
  state: "under_review",
  type: "paid",
  pacingStrategy: CampaignPacingStrategies.Original,
};
