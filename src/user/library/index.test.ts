import { CampaignFragment } from "graphql/campaign.generated";
import { describe, expect, it } from "vitest";
import {
  editCampaignValues,
  transformEditForm,
  transformNewForm,
  transformPrice,
} from ".";
import {
  CampaignFormat,
  CampaignPacingStrategies,
  CampaignSource,
  ConfirmationType,
  PaymentType,
} from "graphql/types";
import { produce } from "immer";
import { AdSetForm, CampaignForm, Creative } from "user/views/adsManager/types";
import _ from "lodash";
import { AdFragment, AdSetFragment } from "graphql/ad-set.generated";
import { CreativeFragment } from "graphql/creative.generated";
import { DeepPartial } from "@apollo/client/utilities";

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
  dayPartings: [],
  hasPaymentIntent: false,
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
      price: "0.006",
      billingType: "cpm",
      name: "Demo ad set",
      totalMax: 10,
      perDay: 1,
      state: "active",
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
        adset.price = "0.007";
      });
    });
    const campaignForm = editCampaignValues(campaign, "abc");
    expect(campaignForm.price).toEqual("7");
    expect(campaignForm.billingType).toEqual("cpm");
  });

  it("should convert per-impression values to CPM when populating CampaignForm", () => {
    const campaign = produce(BASE_CPM_CAMPAIGN_FRAGMENT, (c) => {
      c.adSets.forEach((adset) => {
        adset.billingType = "cpc";
        adset.price = "1";
      });
    });
    const campaignForm = editCampaignValues(campaign, "abc");
    expect(campaignForm.price).toEqual("1");
    expect(campaignForm.billingType).toEqual("cpc");
  });

  it("should default to a price if no adsets are found", () => {
    const campaign = produce(BASE_CPM_CAMPAIGN_FRAGMENT, (c) => {
      c.adSets = [];
    });
    const formObject = editCampaignValues(campaign, "abc");
    expect(formObject.price).toEqual("6");
    expect(formObject.billingType).toEqual("cpm");
  });
});

describe("pricing logic (write)", () => {
  it("should convert from CPM to per-impression values when populating a CPM creative", () => {
    const result = transformPrice({
      billingType: "cpm",
      price: "9",
    });

    expect(result).toEqual("0.009");
  });

  it("should not convert CPC to per-impression values when populating a CPC creative", () => {
    const result = transformPrice({
      billingType: "cpc",
      price: "9",
    });

    expect(result).toEqual("9");
  });

  it("should not convert CPV to per-impression values when populating a CPV creative", () => {
    const result = transformPrice({
      billingType: "cpv",
      price: "9",
    });

    expect(result).toEqual("9");
  });
});

describe("new form tests", () => {
  const dateString = new Date().toLocaleString();

  const creative: Creative = {
    id: "11111",
    advertiserId: "123456",
    included: true,
    name: "Test",
    state: "draft",
    type: { code: "notification_all_v1" },
  };

  const creative2: Creative = {
    id: "33333",
    advertiserId: "123456",
    included: false,
    name: "Dont include",
    state: "draft",
    type: { code: "test" },
  };

  const adSetForm: AdSetForm = {
    conversions: [],
    creatives: [creative, creative2],
    isNotTargeting: false,
    name: "",
    oses: [{ name: "macos", code: "1234" }],
    segments: [{ name: "test", code: "5678" }],
  };

  const form: CampaignForm = {
    adSets: [adSetForm],
    advertiserId: "12345",
    billingType: "cpm",
    budget: 1000,
    currency: "USD",
    dailyBudget: 10,
    endAt: dateString,
    format: CampaignFormat.PushNotification,
    geoTargets: [{ code: "US", name: "United States" }],
    isCreating: false,
    name: "Test",
    paymentType: PaymentType.Radom,
    price: "6",
    startAt: dateString,
    state: "draft",
    type: "paid",
    validateStart: false,
  };

  it("should transform campaign form", () => {
    const res = _.omit(transformNewForm(form, "me"), ["startAt", "endAt"]);
    expect(res).toMatchInlineSnapshot(`
      {
        "adSets": [
          {
            "ads": [
              {
                "creativeId": "11111",
              },
            ],
            "billingType": "cpm",
            "conversions": [],
            "name": "",
            "oses": [
              {
                "code": "1234",
                "name": "macos",
              },
            ],
            "perDay": 4,
            "price": "0.006",
            "segments": [
              {
                "code": "5678",
                "name": "test",
              },
            ],
            "totalMax": 28,
          },
        ],
        "advertiserId": "12345",
        "budget": 1000,
        "currency": "USD",
        "dailyBudget": 10,
        "dailyCap": 4,
        "externalId": "",
        "format": "PUSH_NOTIFICATION",
        "geoTargets": [
          {
            "code": "US",
            "name": "United States",
          },
        ],
        "name": "Test",
        "pacingStrategy": "MODEL_V1",
        "paymentType": "RADOM",
        "source": "self_serve",
        "state": "draft",
        "type": "paid",
        "userId": "me",
      }
    `);
  });
});

describe("edit form tests", () => {
  const creative: CreativeFragment = {
    createdAt: undefined,
    id: "1234",
    modifiedAt: undefined,
    name: "a creative",
    state: "active",
    payloadNotification: {
      targetUrl: "valid",
      title: "valid",
      body: "valid",
    },
    type: { code: "notification_v1_all" },
  };

  const ad: Partial<AdFragment> = {
    id: "1",
    creative: creative,
  };

  const ad2: Partial<AdFragment> = {
    id: "3",
    creative: {
      ...creative,
      id: "1235",
      name: "a different creative",
    },
  };

  const adSet: DeepPartial<AdSetFragment> = {
    ads: [ad, ad2],
    price: "6",
    billingType: "cpm",
    conversions: [],
    createdAt: undefined,
    id: "11111",
    perDay: 1,
    oses: [{ name: "macos", code: "1234" }],
    segments: [{ name: "test", code: "5678" }],
    state: "active",
    totalMax: 100,
  };

  const adSet2: DeepPartial<AdSetFragment> = {
    ads: [ad],
    price: "6",
    billingType: "cpm",
    conversions: [],
    createdAt: undefined,
    id: "22222",
    perDay: 1,
    oses: [{ name: "linux", code: "1234" }],
    segments: [{ name: "help", code: "5678" }],
    state: "active",
    totalMax: 100,
  };

  const campaignFragment: DeepPartial<CampaignFragment> = {
    adSets: [adSet, adSet2],
    advertiser: { id: "12345" },
    budget: 100,
    createdAt: undefined,
    currency: "USD",
    dailyBudget: 0,
    dailyCap: 0,
    endAt: undefined,
    externalId: "",
    format: CampaignFormat.PushNotification,
    id: "000001",
    name: "My first campaign",
    pacingOverride: false,
    pacingStrategy: CampaignPacingStrategies.ModelV1,
    passThroughRate: 0,
    paymentType: PaymentType.Radom,
    priority: 1,
    source: CampaignSource.SelfServe,
    spent: 0,
    startAt: undefined,
    state: "active",
    type: "paid",
  };

  const editForm = editCampaignValues(
    campaignFragment as CampaignFragment,
    campaignFragment?.advertiser?.id ?? "",
  );
  it("should result in a valid campaign form", () => {
    const omitted = _.omit(editForm, ["newCreative"]);
    const sorted = {
      ...omitted,
      adSets: omitted.adSets?.sort(
        (a, b) => a.id?.localeCompare(b.id ?? "") ?? 1,
      ),
    };
    expect(sorted).toMatchInlineSnapshot(`
      {
        "adSets": [
          {
            "conversions": [],
            "creatives": [
              {
                "advertiserId": "12345",
                "createdAt": undefined,
                "creativeInstanceId": "1",
                "id": "1234",
                "included": true,
                "name": "a creative",
                "payloadInlineContent": undefined,
                "payloadNotification": {
                  "body": "valid",
                  "targetUrl": "valid",
                  "title": "valid",
                },
                "state": "active",
                "targetUrlValid": "",
                "type": {
                  "code": "notification_v1_all",
                },
              },
              {
                "advertiserId": "12345",
                "createdAt": undefined,
                "creativeInstanceId": "3",
                "id": "1235",
                "included": true,
                "name": "a different creative",
                "payloadInlineContent": undefined,
                "payloadNotification": {
                  "body": "valid",
                  "targetUrl": "valid",
                  "title": "valid",
                },
                "state": "active",
                "targetUrlValid": "",
                "type": {
                  "code": "notification_v1_all",
                },
              },
            ],
            "id": "11111",
            "isNotTargeting": false,
            "name": "11111",
            "oses": [
              {
                "code": "1234",
                "name": "macos",
              },
            ],
            "segments": [
              {
                "code": "5678",
                "name": "test",
              },
            ],
            "state": "active",
          },
          {
            "conversions": [],
            "creatives": [
              {
                "advertiserId": "12345",
                "createdAt": undefined,
                "creativeInstanceId": "1",
                "id": "1234",
                "included": true,
                "name": "a creative",
                "payloadInlineContent": undefined,
                "payloadNotification": {
                  "body": "valid",
                  "targetUrl": "valid",
                  "title": "valid",
                },
                "state": "active",
                "targetUrlValid": "",
                "type": {
                  "code": "notification_v1_all",
                },
              },
              {
                "advertiserId": "12345",
                "createdAt": undefined,
                "creativeInstanceId": undefined,
                "id": "1235",
                "included": false,
                "name": "a different creative",
                "payloadInlineContent": undefined,
                "payloadNotification": {
                  "body": "valid",
                  "targetUrl": "valid",
                  "title": "valid",
                },
                "state": "active",
                "targetUrlValid": "",
                "type": {
                  "code": "notification_v1_all",
                },
              },
            ],
            "id": "22222",
            "isNotTargeting": false,
            "name": "22222",
            "oses": [
              {
                "code": "1234",
                "name": "linux",
              },
            ],
            "segments": [
              {
                "code": "5678",
                "name": "help",
              },
            ],
            "state": "active",
          },
        ],
        "advertiserId": "12345",
        "billingType": "cpm",
        "budget": 100,
        "currency": "USD",
        "dailyBudget": 0,
        "endAt": undefined,
        "format": "PUSH_NOTIFICATION",
        "geoTargets": [],
        "id": "000001",
        "isCreating": false,
        "name": "My first campaign",
        "paymentType": "RADOM",
        "price": "6000",
        "startAt": undefined,
        "state": "active",
        "type": "paid",
        "validateStart": false,
      }
    `);
  });

  it("should resolve to update input", () => {
    const update = transformEditForm(editForm, editForm.id ?? "");
    const sorted = {
      ...update,
      adSets: update.adSets?.sort(
        (a, b) => a.id?.localeCompare(b.id ?? "") ?? 1,
      ),
    };
    expect(sorted).toMatchInlineSnapshot(`
      {
        "adSets": [
          {
            "ads": [
              {
                "creativeId": "1234",
                "creativeSetId": "11111",
                "id": "1",
              },
              {
                "creativeId": "1235",
                "creativeSetId": "11111",
                "id": "3",
              },
            ],
            "billingType": "cpm",
            "id": "11111",
            "name": "11111",
            "oses": [
              {
                "code": "1234",
                "name": "macos",
              },
            ],
            "perDay": 4,
            "price": "6",
            "segments": [
              {
                "code": "5678",
                "name": "test",
              },
            ],
            "totalMax": 28,
          },
          {
            "ads": [
              {
                "creativeId": "1234",
                "creativeSetId": "22222",
                "id": "1",
              },
            ],
            "billingType": "cpm",
            "id": "22222",
            "name": "22222",
            "oses": [
              {
                "code": "1234",
                "name": "linux",
              },
            ],
            "perDay": 4,
            "price": "6",
            "segments": [
              {
                "code": "5678",
                "name": "help",
              },
            ],
            "totalMax": 28,
          },
        ],
        "budget": 100,
        "dailyBudget": 0,
        "endAt": undefined,
        "id": "000001",
        "name": "My first campaign",
        "paymentType": "RADOM",
        "startAt": undefined,
        "state": "active",
        "type": "paid",
      }
    `);
  });
});
