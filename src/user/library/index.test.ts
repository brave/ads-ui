import { CampaignFragment } from "graphql/campaign.generated";
import { describe, expect, it } from "vitest";
import { editCampaignValues, transformCreative } from ".";
import {
  CampaignFormat,
  CampaignPacingStrategies,
  CampaignSource,
  ConfirmationType,
  PaymentType,
} from "graphql/types";
import { produce } from "immer";
import { Creative } from "user/views/adsManager/types";

const BASE_CPM_CAMPAIGN_FRAGMENT: Readonly<CampaignFragment> = {
  id: "3495317a-bb47-4daf-8d3e-14cdc0e87457",
  name: "demo",
  state: "under_review",
  dailyCap: 1,
  priority: 1,
  passThroughRate: 1,
  pacingOverride: false,
  pacingStrategy: CampaignPacingStrategies.ModelV1,
  externalId: "",
  currency: "USD",
  budget: 2500,
  dailyBudget: 147,
  spent: 0,
  createdAt: "2023-07-11T16:13:31.205Z",
  startAt: "2023-07-14T04:00:00.000Z",
  endAt: "2023-08-01T03:59:00.000Z",
  source: CampaignSource.SelfServe,
  type: "paid",
  format: CampaignFormat.PushNotification,
  paymentType: PaymentType.Stripe,
  geoTargets: [
    {
      code: "US",
      name: "United States",
    },
  ],
  adSets: [
    {
      id: "39644642-b56a-430a-90f8-8917651bb62f",
      createdAt: "2023-07-11T16:13:31.286Z",
      billingType: "cpm",
      name: "Demo ad set",
      totalMax: 10,
      perDay: 1,
      state: "active",
      execution: "per_click",
      segments: [
        {
          code: "elchqV0qNh",
          name: "Arts & Entertainment",
        },
      ],
      oses: [
        {
          code: "i1g4cO6Pl",
          name: "windows",
        },
        {
          code: "_Bt5nxrNo",
          name: "macos",
        },
        {
          code: "-Ug5OXisJ",
          name: "linux",
        },
        {
          code: "k80syyzDa",
          name: "ios",
        },
        {
          code: "mbwfZU-4W",
          name: "android",
        },
      ],
      conversions: [],
      ads: [
        {
          id: "13e4d556-cec4-4b2a-85e6-73fdf625c0cb",
          state: "active",
          price: "0.006",
          priceType: ConfirmationType.View,
          creative: {
            id: "3ee776b6-dd70-4dc5-ba5d-6147c10f2d3d",
            createdAt: "2023-07-11T16:13:19.322Z",
            modifiedAt: "2023-07-11T16:15:18.200Z",
            name: "Demo creative",
            state: "under_review",
            type: {
              code: "notification_all_v1",
            },
            payloadNotification: {
              body: "demo body",
              title: "demo title",
              targetUrl: "https://brave.com/",
            },
          },
        },
      ],
    },
  ],
  advertiser: {
    id: "a3803f55-a755-42df-bf15-9655ea98bac1",
  },
};

describe("pricing logic (read)", () => {
  // prices in the adsever are always expressed per single unit, i.e. the price per click
  // or per impression. Conventionally, impression prices are usually displayed the the user
  // as CPM's, or the price per thousand impressions.

  // In the campaign form backing object CampaignForm, designed for the UI, we follow that convention:
  // the `price` field is per click for CPC, and per thousand views for CPM.

  // But we need to perform that conversion both when populating CampaignForm, and populating
  // the input values to create / update

  it("should convert per-impression values to CPM when populating CampaignForm", () => {
    const campaign = produce(BASE_CPM_CAMPAIGN_FRAGMENT, (c) => {
      c.adSets.forEach((adset) => {
        adset.billingType = "cpm";
        adset.ads?.forEach((ad) => {
          ad.price = "0.007";
          ad.priceType = ConfirmationType.View;
        });
      });
    });
    const campaignForm = editCampaignValues(campaign, "abc");
    expect(campaignForm.price).toEqual(7);
    expect(campaignForm.billingType).toEqual("cpm");
  });

  it("should convert per-impression values to CPM when populating CampaignForm", () => {
    const campaign = produce(BASE_CPM_CAMPAIGN_FRAGMENT, (c) => {
      c.adSets.forEach((adset) => {
        adset.billingType = "cpc";
        adset.ads?.forEach((ad) => {
          ad.price = "1";
          ad.priceType = ConfirmationType.View;
        });
      });
    });
    const campaignForm = editCampaignValues(campaign, "abc");
    expect(campaignForm.price).toEqual(1);
    expect(campaignForm.billingType).toEqual("cpc");
  });

  it("should default to a price if no adsets are found", () => {
    const campaign = produce(BASE_CPM_CAMPAIGN_FRAGMENT, (c) => {
      c.adSets = [];
    });
    const formObject = editCampaignValues(campaign, "abc");
    expect(formObject.price).toEqual(6);
    expect(formObject.billingType).toEqual("cpm");
  });
});

describe("pricing logic (write)", () => {
  const creative: Creative = {
    payloadNotification: {
      title: "some title",
      body: "body",
      targetUrl: "some url",
    },
    advertiserId: "some id",
    state: "draft",
    type: { code: "notification_all_v1" },
    name: "some name",
  };

  it("should convert from CPM to per-impression values when populating a CPM creative", () => {
    const inputObject = transformCreative(creative, {
      billingType: "cpm",
      price: 9,
    });

    expect(inputObject.price).toEqual("0.009");
    expect(inputObject.priceType).toEqual(ConfirmationType.View);
  });

  it("should not convert CPC to per-impression values when populating a CPC creative", () => {
    const inputObject = transformCreative(creative, {
      billingType: "cpc",
      price: 9,
    });

    expect(inputObject.price).toEqual("9");
    expect(inputObject.priceType).toEqual(ConfirmationType.Click);
  });

  it("should not convert CPV to per-impression values when populating a CPV creative", () => {
    const inputObject = transformCreative(creative, {
      billingType: "cpv",
      price: 9,
    });

    expect(inputObject.price).toEqual("9");
    expect(inputObject.priceType).toEqual(ConfirmationType.Landed);
  });
});
