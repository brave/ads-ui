
import {CampaignFormat, CampaignPacingStrategies} from "../../../../graphql/types";
import {defaultEndDate, defaultStartDate} from "../../../../form/DateFieldHelpers";

export type CampaignForm = {
  startAt: string;
  endAt: string;
  budget: number;
  currency: string;
  dailyBudget: number;
  dailyCap: number;
  geoTargets: GeoTarget[];
  adSets: AdSetForm[];
  format: CampaignFormat;
  name: string;
  state: "under_review";
  type: "paid";
  pacingStrategy: CampaignPacingStrategies;
  objective: string;
}

export type GeoTarget = {
  code: string,
  name: string,
}

export type OS = {
  code: string,
  name: string,
}

export type AdSetForm = {
  name: string;
  price: number;
  billingType: string;
  segments: Segment[];
  oses: OS[];
  conversions: Conversion[]
  creatives: Creative[];
}

export type Conversion = {
  type: string;
  observationWindow: number;
  urlPattern: string;
}

export type Segment = {
  code: string;
  name: string;
}

export type Creative = {
  name: string;
  title: string;
  body: string;
  targetUrl: string;
}

export const initialCampaign: CampaignForm = {
  startAt: defaultStartDate(),
  endAt: defaultEndDate(),
  budget: 0,
  currency: "USD",
  dailyBudget: 0,
  dailyCap: 1,
  geoTargets: [],
  adSets: [{
    name: "",
    billingType: "",
    price: 0,
    segments: [{
      code: "Svp7l-zGN",
      name: "untargeted"
    }],
    oses: [],
    conversions: [],
    creatives: [{
      name: "",
      title: "",
      body: "",
      targetUrl: ""
    }]
  }],
  format: CampaignFormat.PushNotification,
  name: "",
  state: "under_review",
  type: "paid",
  pacingStrategy: CampaignPacingStrategies.Original,
  objective: "",
}

export const initialAdSet: AdSetForm = {
  name: "",
  billingType: "",
  price: 0,
  segments: [{
    code: "Svp7l-zGN",
    name: "untargeted"
  }],
  oses: [],
  conversions: [],
  creatives: [{
    name: "",
    title: "",
    body: "",
    targetUrl: ""
  }]
}

export const initialCreative: Creative = {
  name: "",
  title: "",
  body: "",
  targetUrl: ""
}
