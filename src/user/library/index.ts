import {
  CampaignFormat,
  CampaignPacingStrategies,
  CreateCampaignInput,
  UpdateCampaignInput,
} from "graphql/types";
import { CampaignFragment } from "graphql/campaign.generated";
import { AdFragment, AdSetFragment } from "graphql/ad-set.generated";
import {
  AdSetForm,
  Billing,
  CampaignForm,
  Conversion,
  Creative,
  initialCreative,
  Segment,
} from "user/views/adsManager/types";
import _ from "lodash";
import BigNumber from "bignumber.js";
import { CreativeFragment } from "graphql/creative.generated";
import moment from "moment";

const TYPE_CODE_LOOKUP: Record<string, string> = {
  notification_all_v1: "Push Notification",
  new_tab_page_all_v1: "New Tab Takeover",
  inline_content_all_v1: "News Display Ad",
  search_all_v1: "Search SERP",
  search_homepage_all_v1: "Search Homepage",
};

export function transformNewForm(
  form: CampaignForm,
  userId?: string,
): CreateCampaignInput {
  return {
    currency: form.currency,
    externalId: "",
    dailyCap: 1,
    dailyBudget: form.dailyBudget,
    endAt: form.endAt,
    pacingStrategy: CampaignPacingStrategies.ModelV1,
    geoTargets: form.geoTargets.map((g) => ({ code: g.code, name: g.name })),
    name: form.name,
    advertiserId: form.advertiserId,
    format: form.format,
    userId: userId,
    source: "self_serve",
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    budget: form.budget,
    adSets: form.adSets.map((a) => ({
      ...transformAdSet(a, form),
      conversions: transformConversion(a.conversions),
      ads: a.creatives
        .filter((c) => c.included)
        .map((ad) => ({ creativeId: ad.id })),
    })),
    paymentType: form.paymentType,
  };
}

export const transformPrice = (
  f: Pick<CampaignForm, "price" | "billingType">,
) => {
  const price = BigNumber(f.price);
  return f.billingType === "cpm"
    ? price.dividedBy(1000).toString()
    : price.toString();
};

function transformConversion(conv: Conversion[]) {
  if (conv.length <= 0) {
    return [];
  }

  return conv.map((c) => ({
    observationWindow: c.observationWindow * 1.0,
    urlPattern: c.urlPattern,
    type: c.type,
  }));
}

export function editCampaignValues(
  campaign: CampaignFragment,
  advertiserId: string,
): CampaignForm {
  const sort = (a: AdSetFragment, b: AdSetFragment) =>
    moment(a.createdAt).valueOf() - moment(b.createdAt).valueOf();
  const ads: AdFragment[] = _.flatMap(campaign.adSets, "ads");

  const billingType = (_.head(campaign.adSets)?.billingType ??
    "cpm") as Billing;
  const rawPrice = BigNumber(_.head(campaign.adSets)?.price ?? ".006");
  const price = billingType === "cpm" ? rawPrice.multipliedBy(1000) : rawPrice;

  return {
    id: campaign.id,
    adSets: [...campaign.adSets].sort(sort).map((adSet) => {
      const seg = adSet.segments ?? ([] as Segment[]);

      return {
        id: adSet.id,
        state: adSet.state,
        conversions: (adSet.conversions ?? []).map((c) => ({
          id: c.id,
          type: c.type,
          observationWindow: c.observationWindow,
          urlPattern: c.urlPattern,
        })),
        oses: (adSet.oses ?? []).map((o) => ({ name: o.name, code: o.code })),
        segments: (adSet.segments ?? []).map((o) => ({
          name: o.name,
          code: o.code,
        })),
        isNotTargeting: seg.length === 1 && seg[0].code === "Svp7l-zGN",
        name: adSet.name || adSet.id.split("-")[0],
        creatives: creativeList(advertiserId, adSet.ads, ads),
      } as AdSetForm;
    }),
    isCreating: false,
    advertiserId,
    newCreative: initialCreative,
    currency: campaign.currency,
    price: price.toString(),
    billingType: billingType,
    validateStart: false,
    budget: campaign.budget,
    dailyBudget: campaign.dailyBudget,
    endAt: campaign.endAt,
    format: campaign.format,
    geoTargets: (campaign.geoTargets ?? []).map((g) => ({
      code: g.code,
      name: g.name,
    })),
    name: campaign.name,
    startAt: campaign.startAt,
    state: campaign.state,
    type: "paid",
    paymentType: campaign.paymentType,
  };
}

function creativeList(
  advertiserId: string,
  adSetAds?: AdFragment[] | null,
  allAds?: AdFragment[] | null,
): Creative[] {
  const filterAds = (a?: AdFragment[] | null, included?: boolean) => {
    return (a ?? [])
      .filter((ad) => ad.creative !== null && ad.state !== "deleted")
      .map((ad) => {
        const c = ad.creative;
        return {
          ...validCreativeFields(c, advertiserId, included),
          createdAt: c.createdAt,
          creativeInstanceId: included ? ad.id : undefined,
        };
      });
  };

  return _.uniqBy(
    [...filterAds(adSetAds, true), ...filterAds(allAds, false)],
    "id",
  );
}

type GenericCreative = Omit<
  CreativeFragment,
  | "createdAt"
  | "modifiedAt"
  | "payloadSearchHomepage"
  | "payloadSearch"
  | "payloadNewTabPage"
>;
export function validCreativeFields<T extends GenericCreative>(
  c: T,
  advertiserId: string,
  included?: boolean,
) {
  return {
    advertiserId,
    id: c.id,
    included: included ?? false,
    name: c.name,
    targetUrlValid: "",
    state: c.state,
    type: { code: c.type.code },
    payloadNotification: c.payloadNotification
      ? {
          title: c.payloadNotification.title,
          body: c.payloadNotification.body,
          targetUrl: c.payloadNotification.targetUrl,
        }
      : undefined,
    payloadInlineContent: c.payloadInlineContent
      ? {
          ctaText: c.payloadInlineContent.ctaText,
          description: c.payloadInlineContent.description,
          dimensions: "900x750",
          imageUrl: c.payloadInlineContent.imageUrl,
          targetUrl: c.payloadInlineContent.targetUrl,
          title: c.payloadInlineContent.title,
        }
      : undefined,
  };
}

export function transformEditForm(
  form: CampaignForm,
  id: string,
): UpdateCampaignInput {
  return {
    budget: form.budget,
    dailyBudget: form.dailyBudget,
    endAt: form.endAt,
    id,
    name: form.name,
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    paymentType: form.paymentType,
    adSets: form.adSets.map((adSet) => ({
      id: adSet.id,
      ...transformAdSet(adSet, form),
      ads: adSet.creatives
        .filter((c) => c.included)
        .map((ad) => ({
          id: ad.creativeInstanceId,
          creativeId: ad.id,
          creativeSetId: adSet.id,
        })),
    })),
  };
}

function transformAdSet(
  adSet: AdSetForm,
  campaign: Pick<CampaignForm, "format" | "billingType" | "price">,
) {
  return {
    name: adSet.name,
    price: transformPrice(campaign),
    billingType: campaign.billingType,
    perDay: campaign.format === CampaignFormat.PushNotification ? 4 : 6,
    segments: adSet.segments.map((s) => ({ code: s.code, name: s.name })),
    oses: adSet.oses.map((s) => ({ code: s.code, name: s.name })),
    totalMax: campaign.format === CampaignFormat.PushNotification ? 28 : 60,
  };
}

export function uiTextForCreativeType(creativeType: string): string {
  return TYPE_CODE_LOOKUP[creativeType] ?? creativeType;
}

export const CAMPAIGN_FORMATS = [
  { value: CampaignFormat.PushNotification, label: "Push Notification" },
  { value: CampaignFormat.NtpSi, label: "New Tab Takeover" },
  { value: CampaignFormat.NewsDisplayAd, label: "News Display" },
  { value: CampaignFormat.Search, label: "Search SERP" },
  { value: CampaignFormat.SearchHomepage, label: "Search Homepage" },
];

export function uiTextForCampaignFormat(format: CampaignFormat): string {
  return CAMPAIGN_FORMATS.find((f) => f.value === format)?.label ?? format;
}

export function uiTextForCreativeTypeCode(creativeTypeCode: {
  code: string;
}): string {
  return uiTextForCreativeType(creativeTypeCode.code);
}

export function isCreativeTypeApplicableToCampaignFormat(
  creativeTypeCode: {
    code: string;
  },
  format: CampaignFormat,
): boolean {
  const { code } = creativeTypeCode;
  switch (code) {
    case "notification_all_v1":
      return format === CampaignFormat.PushNotification;
    case "new_tab_page_all_v1":
      return format === CampaignFormat.NtpSi;
    case "inline_content_all_v1":
      return format === CampaignFormat.NewsDisplayAd;
    case "search_all_v1":
      return format === CampaignFormat.Search;
    case "search_homepage_all_v1":
      return format === CampaignFormat.SearchHomepage;
    default:
      return false;
  }
}
