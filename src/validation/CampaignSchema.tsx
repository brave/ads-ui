import {
  AnyObject,
  array,
  date,
  number,
  object,
  ref,
  string,
  StringSchema,
} from "yup";
import { twoDaysOut } from "@/form/DateFieldHelpers";
import {
  HttpsRegex,
  NoSpacesRegex,
  SimpleUrlRegexp,
  TrailingAsteriskRegex,
} from "@/validation/regex";
import { CreativeSchema } from "@/validation/CreativeSchema";
import { CampaignFormat } from "@/graphql-client/graphql";
import BigNumber from "bignumber.js";
import { AdvertiserPrice } from "@/user/hooks/useAdvertiserWithPrices";
import { Billing } from "@/user/views/adsManager/types";
import {
  isFuzzyCalculatedDailyBudgetOk,
  uiLabelsForCampaignFormat,
} from "@/util/campaign";

export const MIN_PER_CAMPAIGN = 500;
export const CampaignSchema = (prices: AdvertiserPrice[]) =>
  object().shape({
    id: string().optional(),
    name: string().required("Campaign Name is required"),
    format: string()
      .oneOf([CampaignFormat.NewsDisplayAd, CampaignFormat.PushNotification])
      .required("Campaign Format is required"),
    budget: number()
      .required("Lifetime budget is required")
      .min(
        MIN_PER_CAMPAIGN,
        "Lifetime budget must be $${MIN_PER_CAMPAIGN} or more",
      )
      .when(["startAt", "endAt", "id"], ([startAt, endAt, id], schema) => {
        if (id !== undefined) return schema;
        const { ok, min } = isFuzzyCalculatedDailyBudgetOk(startAt, endAt);
        return schema.test(
          "is-valid-budget",
          `Lifetime budget must be higher for date range provided. Minimum $${min}.`,
          (value) => ok(value),
        );
      }),
    newCreative: object().when("isCreating", {
      is: true,
      then: () => CreativeSchema(),
    }),
    startAt: date().when("id", {
      is: (val: string | undefined) => val === undefined,
      then: (schema) =>
        schema
          .min(
            twoDaysOut().startOf("day"),
            "Start Date must be minimum of 2 days from today",
          )
          .required("Start Date is required"),
    }),
    endAt: date()
      .required("End date is required")
      .min(ref("startAt"), "End date must be after start date"),
    geoTargets: array()
      .of(
        object().shape({
          code: string().required(),
          name: string().required(),
        }),
      )
      .min(1, "At least one country must be targeted")
      .default([]),
    price: string()
      .when(["billingType", "format"], ([billingType, format], schema) => {
        return validatePriceByBillingTypeAndFormat(
          prices,
          format,
          billingType,
          schema,
        );
      })
      .required("Price is a required field"),
    billingType: string()
      .oneOf(["cpm", "cpc", "cpsv"], "Pricing type must be CPM, CPC, or CPSV")
      .required("Pricing type is a required field"),
    adSets: array()
      .min(1)
      .of(
        object().shape({
          name: string().optional(),
          segments: array()
            .of(
              object().shape({
                code: string().required(),
              }),
            )
            .default([]),
          oses: array()
            .of(
              object().shape({
                code: string().required(),
              }),
            )
            .min(1, "At least one platform must be targeted")
            .default([]),
          conversion: object()
            .shape({
              urlPattern: string()
                .required("Conversion URL required.")
                .matches(
                  NoSpacesRegex,
                  "Conversion URL must not contain any whitespace",
                )
                .matches(HttpsRegex, "Conversion URL must start with https://")
                .matches(
                  SimpleUrlRegexp,
                  "Please enter a valid URL, for example https://brave.com/product/*",
                )
                .matches(
                  TrailingAsteriskRegex,
                  "Conversion URL must end in trailing asterisk (*)",
                ),
              observationWindow: number()
                .oneOf(
                  [1, 7, 30],
                  "Observation window must be 1, 7, or 30 days.",
                )
                .required("Observation window required."),
            })
            .notRequired()
            .default(undefined),
          creatives: array().test(
            "min-length",
            "Ad sets must have at least one ad",
            (value) => (value ?? []).filter((c) => c.included).length > 0,
          ),
        }),
      ),
  });

function validatePriceByBillingTypeAndFormat(
  prices: AdvertiserPrice[],
  format: CampaignFormat,
  billingType: Billing,
  schema: StringSchema<string | undefined, AnyObject, undefined, "">,
) {
  const found = prices.find(
    (p) => p.format === format && p.billingType === billingType,
  );

  const label = uiLabelsForCampaignFormat(format);
  if (!found) {
    return schema.test(
      "is-defined",
      `No ${billingType} pricing available for ${label}, contact selfserve@brave.com for help`,
      () => false,
    );
  }

  const price = BigNumber(found.billingModelPrice);
  return schema.test(
    "is-lte-price",
    `${billingType} price must be ${price} or higher`,
    (value) => (value ? price.isLessThanOrEqualTo(value) : true),
  );
}
