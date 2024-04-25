import {
  CampaignFormat,
  CreativeInput,
  PaymentType,
} from "@/graphql-client/graphql";
import { defaultEndDate, defaultStartDate } from "@/form/DateFieldHelpers";
import { MIN_PER_CAMPAIGN } from "@/validation/CampaignSchema";
import { AdvertiserWithPrices } from "@/user/hooks/useAdvertiserWithPrices";

export type Billing = "cpm" | "cpc" | "cpsv";

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
  geoTargets: GeoTarget[];
  adSets: AdSetForm[];
  format: CampaignFormat;
  newCreative?: Creative;
  name: string;
  state: string;
  // this is per click for CPC campaigns, but per thousand views for CPM campaigns
  price: string;
  billingType: Billing;
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
  state?: string;
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

export type Creative = CreativeInput & {
  creativeInstanceId?: string;
  id?: string;
  targetUrlValid?: string;
  state?: string;
  createdAt?: string;
  modifiedAt?: string;
  included: boolean;
};

export const initialConversion: Conversion = {
  type: "",
  urlPattern: "",
  observationWindow: 0,
};

export const initialCreative: Creative = {
  name: "",
  advertiserId: "",
  // eslint-disable-next-line lingui/no-unlocalized-strings
  targetUrlValid: "Target URL validation incomplete",
  payloadNotification: {
    title: "",
    targetUrl: "",
    body: "",
  },
  payloadInlineContent: {
    ctaText: "",
    description: "",
    dimensions: "900x750",
    imageUrl: "",
    targetUrl: "",
    title: "",
  },
  type: { code: "" },
  state: "draft",
  included: false,
};

export const initialAdSet: AdSetForm = {
  name: "",
  isNotTargeting: false,
  segments: [],
  conversions: [],
  oses: [],
  creatives: [],
};

export const initialCampaign = (
  advertiser: AdvertiserWithPrices,
): CampaignForm => {
  return {
    isCreating: false,
    advertiserId: advertiser.id,
    startAt: defaultStartDate(),
    endAt: defaultEndDate(),
    validateStart: true,
    budget: MIN_PER_CAMPAIGN,
    geoTargets: [],
    newCreative: initialCreative,
    billingType: advertiser.prices[0].billingType,
    price: advertiser.prices[0].billingModelPrice,
    currency: "USD",
    adSets: [
      {
        ...initialAdSet,
      },
    ],
    format: advertiser.prices[0].format,
    name: "",
    state: "draft",
    paymentType: advertiser.selfServicePaymentType,
  };
};
