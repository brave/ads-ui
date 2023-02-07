import {CampaignForm, OS, Segment} from "../views/adsManager/types";
import {
  CreateAdInput,
  CreateAdSetInput,
  CreateCampaignInput,
  CreativeInput, GeocodeInput, UpdateAdSetInput, UpdateCampaignInput
} from "../../graphql/types";
import axios from "axios";
import {print} from "graphql";
import {CreateCreativeDocument} from "../../graphql/creative.generated";
import {CampaignFragment} from "../../graphql/campaign.generated";

export async function transformNewForm(
  form: CampaignForm,
  auth: any,
  advertiserId: string
): Promise<CreateCampaignInput> {
  console.log(auth);
  const adSets = form.adSets;
  const transformedAdSet: CreateAdSetInput[] = [];

  for (let adSet of adSets) {
    const transformedAd: CreateAdInput[] = [];

    for (let ad of adSet.creatives) {
      const notification: CreativeInput = {
        advertiserId: advertiserId,
        name: ad.name,
        payloadNotification: { title: ad.title, body: ad.body, targetUrl: ad.targetUrl },
        state: "under_review",
        type: {
          code: "notification_all_v1",
        }
      }
      const withId = await createNotification(auth.accessToken, notification);
      transformedAd.push({
        state: "under_review",
        webhooks: [],
        creativeId: withId,
        prices: [{
          amount: adSet.price,
          type: adSet.billingType === "cpc" ? "click" : "view"
        }]
      });
    }

    const base: CreateAdSetInput = {
      billingType: adSet.billingType,
      execution: "per_click",
      perDay: 1,
      segments: adSet.segments.map((s) => ({ code: s.code, name: s.name })),
      oses: adSet.oses,
      totalMax: 10,
      conversions: adSet.conversions,
      ads: transformedAd,
    }

    transformedAdSet.push(base);
  }

  console.log(form.geoTargets);
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
    source: "direct",
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    budget: form.budget,
    adSets: transformedAdSet,
  }
}

// TODO: Get rid of this ASAP
async function createNotification(accessToken: string, createInput: CreativeInput) {
  const response = await axios.post(
    `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    JSON.stringify({query: print(CreateCreativeDocument), variables: { input: createInput }}),
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  return response.data.data.createCreative.id;
}

export function editCampaignValues(campaign: CampaignFragment): CampaignForm {
  return {
    adSets: campaign.adSets.map((adSet) => ({
      ...adSet,
      conversions: adSet.conversions ?? [],
      oses: adSet.oses ?? [] as OS[],
      segments: adSet.segments ?? [] as Segment[],
      billingType: adSet.billingType ?? "cpm",
      name: adSet.name || adSet.id.split("-")[0],
      creatives: adSet.ads!.map((ad) => {
        const c = ad.creative;
        return {
          id: c.id,
          name: c.name,
          targetUrl: c.payloadNotification!.targetUrl,
          title: c.payloadNotification!.title,
          body: c.payloadNotification!.body
        }
      }),
      price: adSet.ads?.[0].prices[0].amount || 0
    })),
    budget: campaign.budget,
    currency: campaign.currency,
    dailyBudget: campaign.dailyBudget,
    dailyCap: campaign.dailyCap,
    endAt: campaign.endAt,
    format: campaign.format,
    geoTargets: campaign.geoTargets ?? [] as GeocodeInput[],
    name: campaign.name,
    pacingStrategy: campaign.pacingStrategy,
    startAt: campaign.startAt,
    state: campaign.state,
    type: "paid"
  };
}

export function transformEditForm(form: CampaignForm, id: string): UpdateCampaignInput {
  console.log(form)
  return {
    budget: form.budget,
    currency:form.currency,
    dailyBudget: form.dailyBudget,
    dailyCap: form.dailyCap,
    endAt: form.endAt,
    geoTargets: form.geoTargets.map((v) => ({ code: v.code, name: v.name })),
    id,
    name: form.name,
    startAt: form.startAt,
    state: form.state,
    type: form.type,
    adSets: form.adSets.map((ad) => {
      const updateAdSet: UpdateAdSetInput = {
        segments: ad.segments.map((v) => ({ code: v.code, name: v.name })),
        oses: ad.oses.map((v) => ({ code: v.code, name: v.name })),
      }
      return updateAdSet;
    }),
  }
}
