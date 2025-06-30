import { produce } from "immer";
import {
  CampaignFormat,
  CampaignState,
  PaymentType,
} from "@/graphql-client/graphql";
import { CampaignSchema } from "./CampaignSchema";
import { describe } from "vitest";
import { AdvertiserPrice } from "@/user/hooks/useAdvertiserWithPrices";
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
  startAt: "2025-06-06",
  endAt: "2025-06-28",
  format: CampaignFormat.PushNotification,
  geoTargets: [{ code: "a", name: "USA" }],
  state: CampaignState.Draft,
  isCreating: false,
  paymentType: PaymentType.Stripe,
};

beforeAll(() => {
  vi.useFakeTimers({
    now: dayjs("2025-06-03").toDate(),
  });
});

it("should pass on a valid object", () => {
  CampaignSchema(prices).validateSync(validCampaign);
});

it("should fail if the campaign start date is in past", () => {
  const nextState = produce(validCampaign, (draft) => {
    draft.startAt = "2020-07-18";
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

  it("should allow push ads that end after 30 June 2025", () => {
    const nextState = produce(validCampaign, (draft) => {
      draft.startAt = "2025-06-05";
      draft.endAt = "2025-07-20";
      draft.budget = 2000;
    });

    CampaignSchema(prices).validateSync(nextState);
  });
});
