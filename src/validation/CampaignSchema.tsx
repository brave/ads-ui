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
import { t } from "@lingui/macro";

export const MIN_PER_CAMPAIGN = 500;
export const CampaignSchema = (prices: AdvertiserPrice[]) =>
  object().shape({
    id: string().optional(),
    name: string().required(t`Campaign Name is required`),
    format: string()
      .oneOf([CampaignFormat.NewsDisplayAd, CampaignFormat.PushNotification])
      .required(t`Campaign Format is required`),
    budget: number()
      .required(t`Lifetime budget is required`)
      .min(
        MIN_PER_CAMPAIGN,
        t`Lifetime budget must be $${MIN_PER_CAMPAIGN} or more`,
      )
      .when(["startAt", "endAt", "id"], ([startAt, endAt, id], schema) => {
        if (id !== undefined) return schema;
        const { ok, min } = isFuzzyCalculatedDailyBudgetOk(startAt, endAt);
        return schema.test(
          "is-valid-budget",
          t`Lifetime budget must be higher for date range provided. Minimum $${min}.`,
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
            t`Start Date must be minimum of 2 days from today`,
          )
          .required(t`Start Date is required`),
    }),
    endAt: date()
      .required(t`End date is required`)
      .min(ref("startAt"), t`End date must be after start date`),
    geoTargets: array()
      .of(
        object().shape({
          code: string().required(),
          name: string().required(),
        }),
      )
      .min(1, t`At least one country must be targeted`)
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
      .required(t`Price is a required field`),
    billingType: string()
      .oneOf(["cpm", "cpc", "cpsv"], t`Pricing type must be CPM, CPC, or CPSV`)
      .required(t`Pricing type is a required field`),
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
            .min(1, t`At least one platform must be targeted`)
            .default([]),
          conversion: object()
            .shape({
              urlPattern: string()
                .required(t`Conversion URL required.`)
                .matches(
                  NoSpacesRegex,
                  t`Conversion URL must not contain any whitespace`,
                )
                .matches(HttpsRegex, t`Conversion URL must start with https://`)
                .matches(
                  SimpleUrlRegexp,
                  t`Please enter a valid URL, for example https://brave.com/product/*`,
                )
                .matches(
                  TrailingAsteriskRegex,
                  t`Conversion URL must end in trailing asterisk (*)`,
                ),
              observationWindow: number()
                .oneOf(
                  [1, 7, 30],
                  t`Observation window must be 1, 7, or 30 days.`,
                )
                .required(t`Observation window required.`),
            })
            .notRequired()
            .default(undefined),
          creatives: array().test(
            "min-length",
            t`Ad sets must have at least one ad`,
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
      t`No ${billingType} pricing available for ${label}, contact selfserve@brave.com for help`,
      () => false,
    );
  }

  const price = BigNumber(found.billingModelPrice);
  return schema.test(
    "is-lte-price",
    t`${billingType} price must be ${price} or higher`,
    (value) => (value ? price.isLessThanOrEqualTo(value) : true),
  );
}
