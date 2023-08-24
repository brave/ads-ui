import {
  CampaignFormat,
  CampaignPacingStrategies,
  PaymentType,
} from "graphql/types";
import { defaultEndDate, defaultStartDate } from "form/DateFieldHelpers";
import { MIN_PER_CAMPAIGN } from "validation/CampaignSchema";
import { IAdvertiser } from "auth/context/auth.interface";

export type Billing = "cpm" | "cpc" | "cpv";

export type CampaignForm = {
  id?: string;
  draftId?: string;
  advertiserId: string;
  startAt: string;
  endAt: string;
  budget: number;
  validateStart: boolean;
  isCreating: boolean;
  currency: string;
  dailyBudget: number;
  dailyCap: number;
  geoTargets: GeoTarget[];
  adSets: AdSetForm[];
  format: CampaignFormat;
  newCreative?: Creative;
  creatives?: string[];
  name: string;
  state: string;
  type: "paid";
  // this is per click for CPC campaigns, but per thousand views for CPM campaigns
  price: number;
  billingType: Billing;
  pacingStrategy: CampaignPacingStrategies;
  hasPaymentIntent: boolean;
  stripePaymentId?: string | null;
  radomPaymentId?: string | null;
  paymentType: PaymentType;
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
  isNotTargeting: boolean;
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
  targetUrlValidationResult?: string;
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
  state: "draft",
};

export const initialAdSet: AdSetForm = {
  name: "",
  isNotTargeting: true,
  segments: [{ code: "Svp7l-zGN", name: "untargeted" }],
  conversions: [],
  oses: [],
  creatives: [],
};

export const initialCampaign = (advertiser: IAdvertiser): CampaignForm => {
  return {
    advertiserId: advertiser.id,
    startAt: defaultStartDate(),
    endAt: defaultEndDate(),
    validateStart: true,
    isCreating: false,
    budget: MIN_PER_CAMPAIGN,
    hasPaymentIntent: false,
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
    state: "draft",
    type: "paid",
    pacingStrategy: CampaignPacingStrategies.ModelV1,
    paymentType: advertiser.selfServicePaymentType,
    newCreative: initialCreative,
    creatives: [],
  };
};
