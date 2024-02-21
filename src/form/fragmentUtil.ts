import { CreateAdSetInput, CreateCampaignInput } from "graphql/types";
import moment from "moment";
import { CampaignFragment } from "graphql/campaign.generated";
import { AdSetFragment } from "graphql/ad-set.generated";

export function createCampaignFromFragment(
  data: CampaignFragment,
  userId?: string,
): CreateCampaignInput {
  const adSets: CreateAdSetInput[] = data.adSets.map((adSet) =>
    createAdSetFromFragment(adSet),
  );

  const two = moment().utc().add(3, "days");
  return {
    userId,
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
    state: "draft",
    type: data.type,
    paymentType: data.paymentType,
  };
}

export function createAdSetFromFragment(
  data: AdSetFragment,
  campaignId?: string,
): CreateAdSetInput {
  const ads = (data.ads ?? []).filter((ad) => ad.state !== "deleted");
  return {
    campaignId,
    ads: ads.map((ad) => ({
      creativeId: ad.creative.id,
    })),
    price: ads[0].price ?? "6",
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
