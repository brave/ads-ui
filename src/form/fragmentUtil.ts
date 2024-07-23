import {
  AdSetFragment,
  CampaignFragment,
  CampaignState,
  CreateAdSetInput,
  CreateCampaignInput,
} from "@/graphql-client/graphql";
import dayjs from "dayjs";

export function createCampaignFromFragment(
  data: CampaignFragment,
): CreateCampaignInput {
  const adSets: CreateAdSetInput[] = data.adSets.map((adSet) =>
    createAdSetFromFragment(adSet),
  );

  const two = dayjs().utc().add(3, "days");
  return {
    adSets: adSets && adSets.length > 0 ? adSets : undefined,
    advertiserId: data.advertiser.id,
    budget: data.budget,
    currency: data.currency,
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
    // eslint-disable-next-line lingui/no-unlocalized-strings
    name: `${data.name} - Copy`,
    pacingStrategy: data.pacingStrategy,
    source: data.source.toLowerCase(),
    state: CampaignState.Draft,
    type: data.type,
    paymentType: data.paymentType,
  };
}

function createAdSetFromFragment(
  data: AdSetFragment,
  campaignId?: string,
): CreateAdSetInput {
  const ads = (data.ads ?? []).filter((ad) => ad.state !== "deleted");
  return {
    campaignId,
    ads: ads.map((ad) => ({
      creativeId: ad.creative.id,
    })),
    price: data.price ?? "6",
    billingType: data.billingType ?? "cpm",
    conversions: (data.conversions ?? []).map((c) => ({
      observationWindow: c.observationWindow,
      type: c.type,
      urlPattern: c.urlPattern,
    })),
    // eslint-disable-next-line lingui/no-unlocalized-strings
    name: `${data.name ? data.name : data.id.split("-")[0]} - Copy`,
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
