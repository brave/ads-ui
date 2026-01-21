import {
  AdsManagerNewAdSetInput,
  AdsManagerUpdateAdSetInput,
  AdsManagerUpdateCampaignInput,
  CampaignFormat,
  CampaignFragment,
  CreateCampaignInput,
  CreativeFragment,
} from "@/graphql-client/graphql";
import { AdFragment, AdSetFragment } from "@/graphql-client/graphql";
import {
  AdSetForm,
  Billing,
  CampaignForm,
  Conversion,
  Creative,
  initialCreative,
  Segment,
} from "@/user/views/adsManager/types";
import _ from "lodash";
import BigNumber from "bignumber.js";
import dayjs from "dayjs";

export function transformNewForm(form: CampaignForm): CreateCampaignInput {
  return {
    currency: form.currency,
    externalId: "",
    dailyCap: 4,
    endAt: form.endAt,
    geoTargets: form.geoTargets.map((g) => ({ code: g.code, name: g.name })),
    name: form.name,
    advertiserId: form.advertiserId,
    format: form.format,
    source: "self_serve",
    startAt: form.startAt,
    state: form.state,
    budget: form.budget,
    adSets: form.adSets.map((a) => ({
      ...transformAdSet(a, form),
      conversions: transformConversion(a.conversion),
      ads: a.creatives
        .filter(
          (c) =>
            c.included &&
            isCreativeTypeApplicableToCampaignFormat(c.type, form.format),
        )
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

function transformConversion(conv?: Conversion) {
  if (!conv) {
    return [];
  }

  return [
    {
      observationWindow: conv.observationWindow * 1.0,
      urlPattern: conv.urlPattern,
    },
  ];
}

export function editCampaignValues(
  campaign: CampaignFragment,
  advertiserId: string,
): CampaignForm {
  const sort = (a: AdSetFragment, b: AdSetFragment) =>
    dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf();
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
        conversion: (adSet.conversions ?? []).map((c) => ({
          id: c.id,
          observationWindow: c.observationWindow,
          urlPattern: c.urlPattern,
        }))[0],
        oses: (adSet.oses ?? []).map((o) => ({ name: o.name, code: o.code })),
        segments: (adSet.segments ?? []).map((o) => ({
          name: o.name,
          code: o.code,
        })),
        isNotTargeting:
          seg.length === 0 || (seg.length === 1 && seg[0].code === "Svp7l-zGN"),
        name: adSet.name || adSet.id.split("-")[0],
        creatives: creativeList(advertiserId, adSet.ads, ads),
      };
    }),
    isCreating: false,
    advertiserId,
    newCreative: initialCreative,
    currency: campaign.currency,
    price: price.toString(),
    billingType: billingType,
    budget: campaign.budget,
    endAt: campaign.endAt,
    format: campaign.format,
    geoTargets: (campaign.geoTargets ?? []).map((g) => ({
      code: g.code,
      name: g.name,
    })),
    name: campaign.name,
    startAt: campaign.startAt,
    state: campaign.state,
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
    payloadNotification:
      c.type.code === "notification_all_v1" && !!c.payloadNotification
        ? {
            title: c.payloadNotification.title,
            body: c.payloadNotification.body,
            targetUrl: c.payloadNotification.targetUrl,
          }
        : undefined,
    payloadInlineContent:
      c.type.code === "inline_content_all_v1" && !!c.payloadInlineContent
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
  initialValues: CampaignForm,
  id: string,
): AdsManagerUpdateCampaignInput {
  function adSetFieldChange<F extends keyof AdSetForm, U>(
    field: F,
    idx: number,
    transform: (item: AdSetForm[F]) => U,
  ): U | undefined | null {
    const initialAdSet = initialValues.adSets;
    if (!initialAdSet || initialAdSet.length === 0) return undefined;
    if (!_.isEqual(form.adSets[idx][field], initialAdSet[idx][field])) {
      const formValue = form.adSets[idx][field];
      if (formValue === null) return null;
      if (formValue === undefined) return undefined;

      return transform(form.adSets[idx][field]);
    }
    return undefined;
  }

  const toAdd: AdsManagerNewAdSetInput[] = [];
  const toModify: AdsManagerUpdateAdSetInput[] = [];
  form.adSets.forEach((adSet, idx) => {
    if (adSet.id) {
      toModify.push({
        id: adSet.id,
        name: adSetFieldChange("name", idx, (n) => n),
        conversion: adSetFieldChange("conversion", idx, (c) =>
          _.omit(transformConversion(c)[0], "type"),
        ),
        segmentCodes: adSetFieldChange("segments", idx, (s) =>
          s.map((s) => s.code),
        ),
        osCodes: adSetFieldChange("oses", idx, (o) => o.map((o) => o.code)),
        creativeIds: adSetFieldChange(
          "creatives",
          idx,
          (c) =>
            c.filter((c) => c.included && !!c.id).map((c) => c.id) as string[],
        ),
      });
    } else {
      toAdd.push({
        name: adSet.name,
        conversion: adSet.conversion ? _.omit(adSet.conversion, "type") : null,
        segmentCodes: adSet.segments.map((s) => s.code),
        osCodes: adSet.oses.map((s) => s.code),
        creativeIds: adSet.creatives
          .filter((c) => c.included && !!c.id)
          .map((c) => c.id) as string[],
        price: transformPrice(form),
        billingType: form.billingType,
      });
    }
  });

  function campaignFieldChange<F extends keyof CampaignForm>(
    field: F,
  ): CampaignForm[F] | undefined {
    return !_.isEqual(form[field], initialValues[field])
      ? form[field]
      : undefined;
  }

  return {
    id,
    budget: campaignFieldChange("budget"),
    endAt: campaignFieldChange("endAt"),
    name: campaignFieldChange("name"),
    startAt: campaignFieldChange("startAt"),
    geoTargetCodes: campaignFieldChange("geoTargets")?.map((g) => g.code),
    adSets: {
      add: toAdd,
      modify: toModify,
    },
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
    perDay: 4,
    segments: adSet.segments.map((s) => ({ code: s.code, name: s.name })),
    oses: adSet.oses.map((s) => ({ code: s.code, name: s.name })),
    totalMax: campaign.format === CampaignFormat.PushNotification ? 28 : 60,
  };
}

function uiTextForCreativeType(creativeType: string): string {
  const codeLookup: Record<string, string> = {
    notification_all_v1: "Notification",
    new_tab_page_all_v1: "New tab takeover",
    inline_content_all_v1: "Newsfeed",
    search_all_v1: "Search keyword",
    search_homepage_all_v1: "Search homepage",
  };

  return codeLookup[creativeType] ?? creativeType;
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
