import { object, string, ref, number, date, array, bool, boolean } from "yup";
import { startOfDay } from "date-fns";

const HttpsRegex = /^https:\/\//;
const NoSpacesRegex = /^\S*$/;
const TrailingAsteriskRegex = /.*\*$/;

export const CampaignSchema = object().shape({
  name: string().label("Campaign Name").required(),
  budget: number().label("Lifetime Budget").required().positive(),
  dailyBudget: number()
    .label("Daily Budget")
    .required()
    .positive()
    .max(ref("budget"), "Daily Budget cannot be greater than Lifetime Budget"),
  startAt: date()
    .label("Start Date")
    .min(startOfDay(new Date()), "Start Date must not be in the past")
    .required(),
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
      })
    )
    .min(1, "At least one country must be targeted")
    .default([]),
  adSets: array().min(1).of(
    object().shape({
      name: string().label("Ad Set Name").optional(),
      price: number().label("Price").moreThan(0, "Price must be greater than 0").required(),
      billingType: string()
        .label("Pricing Type")
        .required("Pricing type is a required field"),
      segments: array()
        .label("Audiences")
        .of(
          object().shape({
            code: string().required(),
            name: string().required(),
          })
        )
        .min(1, "At least one audience must be targeted")
        .default([]),
      oses: array()
        .label("Platforms")
        .of(
          object().shape({
            code: string().required(),
            name: string().required(),
          })
        )
        .min(1, "At least one platform must be targeted")
        .default([]),
      conversions: array()
        .label("Conversion")
        .min(0)
        .max(1)
        .of(
          object().shape({
            urlPattern: string()
              .required()
              .matches(TrailingAsteriskRegex, "Conversion URL must end in trailing asterisk (*)"),
            observationWindow: number().required().default(7),
            type: string()
              .oneOf(["postclick", "postview"])
              .required()
              .default("postview"),
          })
        ),
      creatives: array().min(1).of(
        object().shape({
          name: string().label("Creative Name").required("Name is required"),
          title: string().label("Title").max(30, "Max 30 Characters").required("Title is required"),
          body: string().label("Body").max(60, "Max 60 Characters").required("Body is required"),
          targetUrl: string().label("Target Url")
            .required("URL is required")
            .matches(NoSpacesRegex, `URL must not contain any whitespace`)
            .matches(HttpsRegex, `URL must start with https://`),
        })
      )
    })
  )
});
