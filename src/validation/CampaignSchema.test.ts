import { parseISO } from "date-fns";
import { produce } from "immer";
import { CampaignFormat, CampaignPacingStrategies } from "graphql/types";
import { CampaignSchema } from "./CampaignSchema";
import { describe } from "vitest";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";

const prices: AdvertiserPrice[] = [
  {
    format: CampaignFormat.PushNotification,
    billingModelPrice: "6",
    billingType: "cpm",
  },
  {
    format: CampaignFormat.PushNotification,
    billingModelPrice: ".15",
    billingType: "cpc",
  },
];

const validCampaign = {
  name: "some campaign",
  budget: 1000,
  currency: "GBP",
  dailyBudget: 100,
  billingType: "cpm",
  price: "6",
  dailyCap: 1,
  startAt: parseISO("2030-07-18"),
  endAt: parseISO("2030-07-20"),
  format: CampaignFormat.PushNotification,
  geoTargets: [{ code: "a", name: "USA" }],
  state: "any",
  type: "paid",
  pacingStrategy: CampaignPacingStrategies.ModelV1,
  validateStart: true,
};

it("should pass on a valid object", () => {
  CampaignSchema(prices).validateSync(validCampaign);
});

it("should fail if the campaign start date is in past", () => {
  const c = produce(validCampaign, (draft) => {
    draft.startAt = parseISO("2020-07-18");
  });

  expect(() =>
    CampaignSchema(prices).validateSync(c),
  ).toThrowErrorMatchingInlineSnapshot(
    '"Start Date must be minimum of 2 days from today"',
  );
});

describe("pricing tests", () => {
  it("should fail if the campaign price is less than allowed price", () => {
    const c = produce(validCampaign, (draft) => {
      draft.price = "5";
    });

    expect(() =>
      CampaignSchema(prices).validateSync(c),
    ).toThrowErrorMatchingInlineSnapshot('"cpm price must be 6 or higher"');
  });

  it("should validate against default if none found", () => {
    const c = produce(validCampaign, (draft) => {
      (draft.format = CampaignFormat.NewsDisplayAd), (draft.price = "9");
    });

    expect(() =>
      CampaignSchema(prices).validateSync(c),
    ).toThrowErrorMatchingInlineSnapshot('"cpm price must be 10 or higher"');
  });

  it("should validate against default if none found", () => {
    const c = produce(validCampaign, (draft) => {
      (draft.format = CampaignFormat.NewsDisplayAd),
        (draft.billingType = "cpc");
      draft.price = ".1";
    });

    expect(() =>
      CampaignSchema(prices).validateSync(c),
    ).toThrowErrorMatchingInlineSnapshot('"cpc price must be 0.15 or higher"');
  });
});
