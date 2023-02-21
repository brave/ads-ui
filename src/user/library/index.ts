import {
  AdSetForm,
  CampaignForm,
  Conversion,
  Creative,
  OS,
  Segment,
} from "../views/adsManager/types";
import {
  CreateAdInput,
  CreateAdSetInput,
  CreateCampaignInput,
  CreateNotificationCreativeInput,
  GeocodeInput,
  UpdateAdSetInput,
  UpdateCampaignInput,
} from "../../graphql/types";
import axios from "axios";
import { print } from "graphql";
import { CampaignFragment } from "../../graphql/campaign.generated";
import { CreateAdDocument } from "../../graphql/ad-set.generated";
import { CreateNotificationCreativeDocument } from "../../graphql/creative.generated";
import { IAuthUser } from "../../actions";

export async function transformNewForm(
  form: CampaignForm,
  auth: IAuthUser,
  advertiserId: string
): Promise<CreateCampaignInput> {
  const adSets = form.adSets;
  const transformedAdSet: CreateAdSetInput[] = [];

  for (const adSet of adSets) {
    const ads: CreateAdInput[] = [];

    for (const ad of adSet.creatives) {
      const creative = await transformCreative(ad, adSet, auth, advertiserId);
      ads.push(creative);
    }

    const base: CreateAdSetInput = {
      billingType: adSet.billingType,
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
    advertiserId: advertiserId,
    externalId: "",
    format: form.format,
    userId: auth.id,
    source: "direct",
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    budget: form.budget,
    adSets: transformedAdSet,
  };
}

function transformConversion(conv: Conversion[]) {
  if (conv.length === 0) {
    return [];
  }

  const conversion = conv[0];
  return [
    {
      // need to make observationWindow a float
      observationWindow: conversion.observationWindow,
      urlPattern: conversion.urlPattern,
      type: conversion.type,
    },
  ];
}

async function transformCreative(
  creative: Creative,
  adSet: AdSetForm,
  auth: IAuthUser,
  advertiserId: string
): Promise<CreateAdInput> {
  const notification: CreateNotificationCreativeInput = {
    advertiserId: advertiserId,
    userId: auth.id,
    name: creative.name,
    payload: {
      title: creative.title,
      body: creative.body,
      targetUrl: creative.targetUrl,
    },
    state: "under_review",
    type: {
      code: "notification_all_v1",
    },
  };
  const withId = await createNotification(auth.accessToken, notification);
  return {
    state: "under_review",
    webhooks: [],
    creativeId: withId,
    prices: [
      {
        amount: adSet.price,
        type: adSet.billingType === "cpc" ? "click" : "view",
      },
    ],
  };
}

// TODO: Get rid of this ASAP. Currently necessary because when creating a campaign, you need existing creativeId.
async function createNotification(
  accessToken: string,
  createInput: CreateNotificationCreativeInput
) {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    JSON.stringify({
      query: print(CreateNotificationCreativeDocument),
      variables: { input: createInput },
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.createNotificationCreative.id;
}

// TODO: Get rid of this ASAP. Currently necessary because when updating a campaign, it does not take into account any new ads.
async function createAd(accessToken: string, createInput: CreateAdInput) {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    JSON.stringify({
      query: print(CreateAdDocument),
      variables: { createAdInput: createInput },
    }),
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response.data.data.createAd.id;
}

export function editCampaignValues(campaign: CampaignFragment): CampaignForm {
  return {
    adSets: campaign.adSets.map((adSet) => ({
      ...adSet,
      id: adSet.id,
      conversions: adSet.conversions ?? [],
      oses: adSet.oses ?? ([] as OS[]),
      segments: adSet.segments ?? ([] as Segment[]),
      billingType: adSet.billingType ?? "cpm",
      name: adSet.name || adSet.id.split("-")[0],
      creatives: adSet.ads!.map((ad) => {
        const c = ad.creative;
        return {
          id: c.id,
          name: c.name,
          targetUrl: c.payloadNotification!.targetUrl,
          title: c.payloadNotification!.title,
          body: c.payloadNotification!.body,
          targetUrlValid: true,
        };
      }),
      price: adSet.ads?.[0].prices[0].amount || 0,
    })),
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
  };
}

export async function transformEditForm(
  form: CampaignForm,
  id: string,
  auth: IAuthUser,
  advertiserId: string
): Promise<UpdateCampaignInput> {
  const transformedAdSet: UpdateAdSetInput[] = [];

  for (const adSet of form.adSets) {
    const newCreatives = adSet.creatives.filter((c) => c.id === undefined);
    for (const ad of newCreatives) {
      const withId = await transformCreative(ad, adSet, auth, advertiserId);
      await createAd(auth.accessToken, {
        ...withId,
        creativeSetId: adSet.id,
      });
    }

    const base: UpdateAdSetInput = {
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
    geoTargets: form.geoTargets.map((v) => ({ code: v.code, name: v.name })),
    id,
    name: form.name,
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    adSets: transformedAdSet,
  };
}
