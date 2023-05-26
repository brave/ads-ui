import {
  AdvertiserCampaignFilter,
  CreateAdInput,
  CreateAdSetInput,
  CreateCampaignInput,
  CreateNotificationCreativeInput,
  GeocodeInput,
  UpdateAdSetInput,
  UpdateCampaignInput,
  UpdateNotificationCreativeInput,
} from "graphql/types";
import axios from "axios";
import { DocumentNode, print } from "graphql";
import {
  CampaignAdsFragment,
  CampaignFragment,
  LoadCampaignAdsDocument,
  UpdateCampaignDocument,
} from "graphql/campaign.generated";
import { CreateAdDocument } from "graphql/ad-set.generated";
import {
  CreateNotificationCreativeDocument,
  UpdateNotificationCreativeDocument,
} from "graphql/creative.generated";
import {
  Billing,
  CampaignForm,
  Conversion,
  Creative,
  OS,
  Segment,
} from "user/views/adsManager/types";

const TYPE_CODE_LOOKUP: Record<string, string> = {
  notification_all_v1: "Push Notification",
  new_tab_page_all_v1: "Sponsored Image",
  inline_content_all_v1: "News Display Ad",
  search_all_v1: "Search SERP",
  search_homepage_all_v1: "Search Homepage",
};

export async function transformNewForm(
  form: CampaignForm,
  advertiserId: string,
  userId?: string
): Promise<CreateCampaignInput> {
  const adSets = form.adSets;
  const transformedAdSet: CreateAdSetInput[] = [];

  for (const adSet of adSets) {
    const ads: CreateAdInput[] = [];

    for (const ad of adSet.creatives) {
      const creative = await transformCreative(ad, form, advertiserId, userId);
      ads.push(creative);
    }

    const base: CreateAdSetInput = {
      name: adSet.name,
      billingType: form.billingType,
      execution: "per_click",
      perDay: 1,
      segments: adSet.segments.map((s) => ({ code: s.code, name: s.name })),
      oses: adSet.oses,
      totalMax: 10,
      conversions: transformConversion(adSet.conversions),
      ads: ads,
    };

    transformedAdSet.push(base);
  }

  return {
    currency: form.currency,
    dailyCap: form.dailyCap,
    dailyBudget: form.dailyBudget,
    endAt: form.endAt,
    geoTargets: form.geoTargets.map((g) => ({ code: g.code, name: g.name })),
    name: form.name,
    advertiserId,
    externalId: "",
    format: form.format,
    userId: userId,
    source: "self_serve",
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    budget: form.budget,
    adSets: transformedAdSet,
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

async function transformCreative(
  creative: Creative,
  campaign: CampaignForm,
  advertiserId: string,
  userId?: string
): Promise<CreateAdInput> {
  const notification = creativeInput(
    advertiserId,
    creative,
    userId
  ) as CreateNotificationCreativeInput;
  const withId = await createNotification(notification);
  return {
    webhooks: [],
    creativeId: withId,
    prices: [
      {
        amount: campaign.price,
        type: campaign.billingType === "cpc" ? "click" : "view",
      },
    ],
  };
}

function creativeInput(
  advertiserId: string,
  creative: Creative,
  userId?: string
): CreateNotificationCreativeInput | UpdateNotificationCreativeInput {
  const baseNotification = {
    advertiserId,
    userId,
    name: creative.name,
    payload: {
      title: creative.title,
      body: creative.body,
      targetUrl: creative.targetUrl,
    },
    state: creative.state,
  };

  if (creative.id) {
    return {
      ...baseNotification,
      creativeId: creative.id,
    };
  }

  return {
    ...baseNotification,
    type: {
      code: "notification_all_v1",
    },
  };
}

async function graphqlRequest<T>(node: DocumentNode, input: T) {
  const response = await axios.post(
    `${import.meta.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    JSON.stringify({
      query: print(node),
      variables: input,
    }),
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
}

// TODO: Get rid of this ASAP. Currently necessary because when creating a campaign, you need existing creativeId.
async function createNotification(
  createInput: CreateNotificationCreativeInput
) {
  const response = await graphqlRequest<{
    input: CreateNotificationCreativeInput;
  }>(CreateNotificationCreativeDocument, { input: createInput });

  return response.data.createNotificationCreative.id;
}

async function updateNotification(
  updateInput: UpdateNotificationCreativeInput
) {
  const response = await graphqlRequest<{
    input: UpdateNotificationCreativeInput;
  }>(UpdateNotificationCreativeDocument, { input: updateInput });

  return response.data.updateNotificationCreative.id;
}

// TODO: Get rid of this ASAP. Currently necessary because when updating a campaign, it does not take into account any new ads.
async function createAd(createInput: CreateAdInput) {
  const response = await graphqlRequest<{ createAdInput: CreateAdInput }>(
    CreateAdDocument,
    { createAdInput: createInput }
  );

  return response.data.createAd.id;
}

export function editCampaignValues(campaign: CampaignFragment): CampaignForm {
  return {
    adSets: campaign.adSets.map((adSet) => {
      const seg = adSet.segments ?? ([] as Segment[]);

      return {
        ...adSet,
        id: adSet.id,
        conversions: adSet.conversions ?? [],
        oses: adSet.oses ?? ([] as OS[]),
        segments: adSet.segments ?? ([] as Segment[]),
        isNotTargeting: seg.length === 1 && seg[0].code === "Svp7l-zGN",
        name: adSet.name || adSet.id.split("-")[0],
        creatives: adSet.ads!.map((ad) => {
          const c = ad.creative;
          return {
            creativeInstanceId: ad.id,
            id: c.id,
            name: c.name,
            targetUrl: c.payloadNotification!.targetUrl,
            title: c.payloadNotification!.title,
            body: c.payloadNotification!.body,
            targetUrlValid: true,
            state: c.state,
          };
        }),
      };
    }),
    price: campaign.adSets[0].ads?.[0].prices[0].amount ?? 6,
    billingType: (campaign.adSets[0].billingType ?? "cpm") as Billing,
    validateStart: false,
    budget: campaign.budget,
    currency: campaign.currency,
    dailyBudget: campaign.dailyBudget,
    dailyCap: campaign.dailyCap,
    endAt: campaign.endAt,
    format: campaign.format,
    geoTargets: campaign.geoTargets ?? ([] as GeocodeInput[]),
    name: campaign.name,
    pacingStrategy: campaign.pacingStrategy,
    startAt: campaign.startAt,
    state: campaign.state,
    type: "paid",
    stripePaymentId: campaign.stripePaymentId,
    paymentType: campaign.paymentType,
  };
}

export async function transformEditForm(
  form: CampaignForm,
  id: string,
  advertiserId: string,
  userId?: string
): Promise<UpdateCampaignInput> {
  const transformedAdSet: UpdateAdSetInput[] = [];

  for (const adSet of form.adSets) {
    const creatives = adSet.creatives;
    for (const ad of creatives) {
      if (ad.id == null) {
        const withId = await transformCreative(ad, form, advertiserId, userId);
        await createAd({
          ...withId,
          creativeSetId: adSet.id,
        });
      } else if (
        ad.state !== "active" &&
        ad.state !== "paused" &&
        ad.state !== "complete"
      ) {
        const notification = creativeInput(
          advertiserId,
          ad,
          userId
        ) as UpdateNotificationCreativeInput;
        await updateNotification(notification);
      }
    }

    const base: UpdateAdSetInput = {
      id: adSet.id,
      segments: adSet.segments.map((v) => ({ code: v.code, name: v.name })),
      oses: adSet.oses.map((v) => ({ code: v.code, name: v.name })),
    };

    transformedAdSet.push(base);
  }

  return {
    budget: form.budget,
    currency: form.currency,
    dailyBudget: form.dailyBudget,
    dailyCap: form.dailyCap,
    endAt: form.endAt,
    id,
    name: form.name,
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    adSets: transformedAdSet,
  };
}

export function updateCampaignState(
  c: CampaignFragment,
  state: string
): UpdateCampaignInput {
  return {
    budget: c.budget,
    currency: c.currency,
    dailyBudget: c.dailyBudget,
    dailyCap: c.dailyCap,
    endAt: c.endAt,
    id: c.id,
    name: c.name,
    startAt: c.startAt,
    state,
    type: c.type,
  };
}

export function uiTextForCreativeType(creativeType: string): string {
  return TYPE_CODE_LOOKUP[creativeType] ?? creativeType;
}

export function uiTextForCreativeTypeCode(creativeTypeCode: {
  code: string;
}): string {
  return uiTextForCreativeType(creativeTypeCode.code);
}

export function populateFilter(
  fromDate: Date | null
): AdvertiserCampaignFilter {
  return {
    includeAds: true,
    includeCreativeSets: true,
    from: fromDate,
  };
}
