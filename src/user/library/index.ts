import {
  CampaignFormat,
  CampaignPacingStrategies,
  ConfirmationType,
  CreateAdInput,
  CreateCampaignInput,
  UpdateCampaignInput,
} from "graphql/types";
import { CampaignFragment } from "graphql/campaign.generated";
import { AdFragment } from "graphql/ad-set.generated";
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
    adSets: form.adSets.map((adSet) => ({
      name: adSet.name,
      billingType: form.billingType,
      perDay: 1,
      segments: adSet.segments.map((s) => ({ code: s.code, name: s.name })),
      oses: adSet.oses,
      totalMax: 10,
      conversions: transformConversion(adSet.conversions),
      ads: adSet.creatives
        .filter((c) => c.included)
        .map((ad) => transformCreative(ad, form)),
    })),
    paymentType: form.paymentType,
  };
}

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

export function transformCreative(
  creative: Creative,
  campaign: Pick<CampaignForm, "price" | "billingType">,
): CreateAdInput {
  let price: BigNumber;
  let priceType: ConfirmationType;

  if (campaign.billingType === "cpm") {
    price = BigNumber(campaign.price).dividedBy(1000);
    priceType = ConfirmationType.View;
  } else if (campaign.billingType === "cpv") {
    price = BigNumber(campaign.price);
    priceType = ConfirmationType.Landed;
  } else {
    price = BigNumber(campaign.price);
    priceType = ConfirmationType.Click;
  }

  const createInput: CreateAdInput = {
    price: price.toString(),
    priceType: priceType,
  };

  createInput.creativeId = creative.id;

  return createInput;
}

export function editCampaignValues(
  campaign: CampaignFragment,
  advertiserId: string,
): CampaignForm {
  const ads: AdFragment[] = _.flatMap(campaign.adSets, "ads");

  const billingType = (_.head(campaign.adSets)?.billingType ??
    "cpm") as Billing;
  const rawPrice = BigNumber(_.head(ads)?.price ?? "0.006");
  const price = billingType === "cpm" ? rawPrice.multipliedBy(1000) : rawPrice;

  return {
    id: campaign.id,
    adSets: campaign.adSets.map((adSet) => {
      const seg = adSet.segments ?? ([] as Segment[]);

      return {
        id: adSet.id,
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
    price: price.toNumber(),
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
        };
      });
  };

  return _.uniqBy(
    [...filterAds(adSetAds, true), ...filterAds(allAds, false)],
    "id",
  );
}

export function validCreativeFields(
  c: CreativeFragment | Creative,
  advertiserId: string,
  included?: boolean,
): Creative {
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
      segments: adSet.segments.map((v) => ({ code: v.code, name: v.name })),
      oses: adSet.oses.map((v) => ({ code: v.code, name: v.name })),
      ads: adSet.creatives
        .filter((c) => c.included)
        .map((ad) => ({
          ...transformCreative(ad, form),
          creativeSetId: adSet.id,
        })),
    })),
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
