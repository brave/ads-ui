import {CampaignForm} from "../views/adsManager/types";
import {
  CreateAdInput,
  CreateAdSetInput,
  CreateCampaignInput,
  CreativeInput
} from "../../graphql/types";
import axios from "axios";
import {print} from "graphql";
import {CreateCreativeDocument} from "../../graphql/creative.generated";

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
      billingType: `${adSet.price}`,
      execution: "per_click",
      perDay: 1,
      segments: adSet.segments,
      oses: adSet.oses,
      totalMax: 10,
      conversions: adSet.conversions,
      ads: transformedAd,
    }

    transformedAdSet.push(base);
  }

  return {
    currency: form.currency,
    dailyCap: form.dailyCap,
    dailyBudget: form.dailyBudget,
    endAt: form.endAt,
    geoTargets: form.geoTargets,
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
  const response = await axios.post<{ createCreative: { id: string } }>(
    `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
    JSON.stringify({query: print(CreateCreativeDocument), variables: { input: createInput }}),
    {
      headers: {
        "Authorization": `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      }
    }
  );

  console.log(response.data)

  return response.data.createCreative.id;
}
