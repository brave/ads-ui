import { array, boolean, date, number, object, ref, string } from "yup";
import { startOfDay } from "date-fns";
import { twoDaysOut } from "form/DateFieldHelpers";
import { TrailingAsteriskRegex } from "validation/regex";
import { CreativeSchema } from "validation/CreativeSchema";
import { CampaignFormat } from "graphql/types";

export const MIN_PER_DAY = 33;
export const MIN_PER_CAMPAIGN = 100;

export const CampaignSchema = object().shape({
  name: string().label("Campaign Name").required(),
  format: string()
    .label("Campaign Format")
    .oneOf([CampaignFormat.NewsDisplayAd, CampaignFormat.PushNotification])
    .required(),
  budget: number()
    .label("Lifetime Budget")
    .required()
    .min(
      MIN_PER_CAMPAIGN,
      `Lifetime budget must be $${MIN_PER_CAMPAIGN} or more`,
    ),
  newCreative: object().when("isCreating", {
    is: true,
    then: () => CreativeSchema,
  }),
  validateStart: boolean(),
  dailyBudget: number()
    .label("Daily Budget")
    .required()
    .positive()
    .min(MIN_PER_DAY, "Lifetime budget must be higher for date range provided"),
  startAt: date()
    .label("Start Date")
    .when("validateStart", {
      is: true,
      then: (schema) =>
        schema
          .min(
            startOfDay(twoDaysOut()),
            "Start Date must be minimum of 2 days from today",
          )
          .required(),
    }),
  endAt: date()
    .label("End Date")
    .required()
    .min(ref("startAt"), "End date must be after Start date"),
  geoTargets: array()
    .label("Locations")
    .of(
      object().shape({
        code: string().required(),
        name: string().required(),
      }),
    )
    .min(1, "At least one country must be targeted")
    .default([]),
  price: number()
    .label("Price")
    .when("billingType", {
      is: (b: string) => b === "cpc",
      then: (schema) =>
        schema.moreThan(0.09, "CPC price must be .10 or higher"),
    })
    .when(["billingType", "format"], {
      is: (b: string, f: CampaignFormat) =>
        b === "cpm" && f === CampaignFormat.PushNotification,
      then: (schema) => schema.moreThan(5, "CPM price must be 6 or higher"),
    })
    .when(["billingType", "format"], {
      is: (b: string, f: CampaignFormat) =>
        b === "cpm" && f === CampaignFormat.NewsDisplayAd,
      then: (schema) => schema.moreThan(9, "CPM price must be 10 or higher"),
    })
    .required("Price is a required field"),
  billingType: string()
    .label("Pricing Type")
    .oneOf(["cpm", "cpc"])
    .required("Pricing type is a required field"),
  adSets: array()
    .min(1)
    .of(
      object().shape({
        name: string().label("Ad Set Name").optional(),
        segments: array()
          .label("Audiences")
          .of(
            object().shape({
              code: string().required(),
              name: string().required(),
            }),
          )
          .min(1, "At least one audience must be targeted")
          .default([]),
        oses: array()
          .label("Platforms")
          .of(
            object().shape({
              code: string().required(),
              name: string().required(),
            }),
          )
          .min(1, "At least one platform must be targeted")
          .default([]),
        conversions: array()
          .label("Conversions")
          .min(0)
          .max(1)
          .of(
            object().shape({
              urlPattern: string()
                .required("Conversion URL required.")
                .matches(
                  TrailingAsteriskRegex,
                  "Conversion URL must end in trailing asterisk (*)",
                ),
              observationWindow: number()
                .oneOf(
                  [1, 7, 30],
                  "Observation Window must be 1, 7, or 30 days.",
                )
                .required("Observation Window required."),
              type: string()
                .oneOf(
                  ["postclick", "postview"],
                  "Conversion type must be Post Click or Post View",
                )
                .required("Conversion Type required."),
            }),
          ),
        creatives: array().test(
          "min-length",
          "Ad Sets must have at least one Ad",
          (value) => (value ?? []).filter((c) => c.included).length > 0,
        ),
      }),
    ),
});
