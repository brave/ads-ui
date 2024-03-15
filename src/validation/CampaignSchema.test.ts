import { produce } from "immer";
import { CampaignFormat, CampaignPacingStrategies } from "graphql/types";
import { CampaignSchema } from "./CampaignSchema";
import { describe } from "vitest";
import { AdvertiserPrice } from "user/hooks/useAdvertiserWithPrices";
import dayjs from "dayjs";

const prices: AdvertiserPrice[] = [
  {
    format: CampaignFormat.PushNotification,
    billingModelPrice: "6",
    billingType: "cpm",
  },
  {
    format: CampaignFormat.PushNotification,
    billingModelPrice: "0.15",
    billingType: "cpc",
  },
  {
    format: CampaignFormat.PushNotification,
    billingModelPrice: "3",
    billingType: "cpsv",
  },
  {
    format: CampaignFormat.NewsDisplayAd,
    billingModelPrice: "10",
    billingType: "cpm",
  },
  {
    format: CampaignFormat.NewsDisplayAd,
    billingModelPrice: "3",
    billingType: "cpsv",
  },
];

const validCampaign = {
  name: "some campaign",
  budget: 1000,
  currency: "GBP",
  billingType: "cpm",
  price: "6",
  dailyCap: 1,
  startAt: dayjs("2030-07-18").toDate(),
  endAt: dayjs("2030-07-20").toDate(),
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
  const nextState = produce(validCampaign, (draft) => {
    draft.startAt = dayjs("2020-07-18").toDate();
  });

  expect(() =>
    CampaignSchema(prices).validateSync(nextState),
  ).toThrowErrorMatchingInlineSnapshot(
    `[ValidationError: Start Date must be minimum of 2 days from today]`,
  );
});

describe("pricing tests", () => {
  it.each([
    { price: "6", format: CampaignFormat.PushNotification, billing: "cpm" },
    { price: ".15", format: CampaignFormat.PushNotification, billing: "cpc" },
    { price: "3", format: CampaignFormat.PushNotification, billing: "cpsv" },
    { price: "10", format: CampaignFormat.NewsDisplayAd, billing: "cpm" },
    { price: "3", format: CampaignFormat.NewsDisplayAd, billing: "cpsv" },
  ])(
    "success cases: $format with price $price and config $billing should pass",
    async ({ price, format, billing }) => {
      const nextState = produce(validCampaign, (draft) => {
        draft.price = price;
        draft.format = format;
        draft.billingType = billing;
      });

      expect(() =>
        CampaignSchema(prices).validateSync(nextState),
      ).not.toThrowError();
    },
  );

  it.each([
    { price: "5", format: CampaignFormat.PushNotification, billing: "cpm" },
    { price: ".10", format: CampaignFormat.PushNotification, billing: "cpc" },
    { price: "2", format: CampaignFormat.PushNotification, billing: "cpsv" },
    { price: "9", format: CampaignFormat.NewsDisplayAd, billing: "cpm" },
    { price: "2", format: CampaignFormat.NewsDisplayAd, billing: "cpsv" },
  ])(
    "failure cases: $format with price $price and config $billing should fail",
    async ({ price, format, billing }) => {
      const nextState = produce(validCampaign, (draft) => {
        draft.price = price;
        draft.format = format;
        draft.billingType = billing;
      });

      const priceFound = prices.find(
        (p) => p.billingType === billing && p.format === format,
      );
      expect(() => CampaignSchema(prices).validateSync(nextState)).toThrowError(
        `${billing} price must be ${priceFound?.billingModelPrice} or higher`,
      );
    },
  );

  it("should fail prices if none found in array", () => {
    const nextState = produce(validCampaign, (draft) => {
      draft.price = ".15";
      draft.format = CampaignFormat.NewsDisplayAd;
      draft.billingType = "cpc";
    });

    expect(() =>
      CampaignSchema(prices).validateSync(nextState),
    ).toThrowErrorMatchingInlineSnapshot(
      `[ValidationError: No cpc pricing available for Newsfeed, contact selfserve@brave.com for help]`,
    );
  });
});
