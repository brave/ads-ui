import { CreateAdSetInput, CreateCampaignInput } from "graphql/types";
import moment from "moment";
import { CampaignFragment } from "graphql/campaign.generated";
import { AdSetFragment } from "graphql/ad-set.generated";

export function createCampaignFromFragment(
  data: CampaignFragment,
): CreateCampaignInput {
  const adSets: CreateAdSetInput[] = data.adSets.map((adSet) =>
    createAdSetFromFragment(adSet),
  );

  const two = moment().utc().add(3, "days");
  return {
    adSets: adSets && adSets.length > 0 ? adSets : undefined,
    advertiserId: data.advertiser.id,
    budget: data.budget,
    currency: data.currency,
    dailyBudget: data.dailyBudget,
    dailyCap: data.dailyCap,
    dayPartings: (data.dayPartings ?? []).map((d) => ({
      dow: d.dow,
      startMinute: d.startMinute,
      endMinute: d.endMinute,
    })),
    dayProportion: data.dayProportion,
    startAt: two.startOf("day").toISOString(),
    endAt: two.endOf("day").toISOString(),
    externalId: data.externalId,
    format: data.format,
    geoTargets: (data.geoTargets ?? []).map((g) => ({
      code: g.code,
      name: g.name,
    })),
    name: `${data.name} - Copy`,
    pacingStrategy: data.pacingStrategy,
    source: data.source.toLowerCase(),
    state: "draft",
    type: data.type,
  };
}

export function createAdSetFromFragment(
  data: AdSetFragment,
  campaignId?: string,
): CreateAdSetInput {
  return {
    campaignId,
    ads: (data.ads ?? [])
      .filter((ad) => ad.state !== "deleted")
      .map((ad) => ({
        creativeId: ad.creative.id,
        price: ad.price,
        priceType: ad.priceType,
      })),
    bannedKeywords: data.bannedKeywords,
    billingType: data.billingType ?? "cpm",
    conversions: (data.conversions ?? []).map((c) => ({
      observationWindow: c.observationWindow,
      type: c.type,
      urlPattern: c.urlPattern,
    })),
    execution: data.execution,
    keywordSimilarity: data.keywordSimilarity,
    keywords: data.keywords,
    name: `${data.name ? data.name : data.id.split("-")[0]} - Copy`,
    negativeKeywords: data.negativeKeywords,
    oses: (data.oses ?? []).map((o) => ({ name: o.name, code: o.code })),
    perDay: data.perDay,
    segments: (data.segments ?? []).map((o) => ({
      name: o.name,
      code: o.code,
    })),
    state: data.state,
    totalMax: data.totalMax,
  };
}
