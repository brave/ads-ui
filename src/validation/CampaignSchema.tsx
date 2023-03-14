import { object, string, ref, number, date, array, boolean } from "yup";
import { startOfDay } from "date-fns";
import { twoDaysOut } from "../form/DateFieldHelpers";

export const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const TrailingAsteriskRegex = /.*\*$/;

export const MIN_PER_DAY = 33;
export const MIN_PER_CAMPAIGN = 1000;

export const CampaignSchema = object().shape({
  name: string().label("Campaign Name").required(),
  budget: number()
    .label("Lifetime Budget")
    .required()
    .min(MIN_PER_CAMPAIGN, "Lifetime budget must be $1000 or more"),
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
      then: date()
        .min(
          startOfDay(twoDaysOut()),
          "Start Date must be minimum of 2 days from today"
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
      })
    )
    .min(1, "At least one country must be targeted")
    .max(3, "Maximum of 3 countries can be targeted")
    .default([]),
  adSets: array()
    .min(1)
    .of(
      object().shape({
        name: string().label("Ad Set Name").optional(),
        price: number()
          .label("Price")
          .moreThan(0, "Price must be greater than 0")
          .required(),
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
          .label("Conversions")
          .min(0)
          .max(1)
          .of(
            object().shape({
              urlPattern: string()
                .required("Conversion URL required.")
                .matches(
                  TrailingAsteriskRegex,
                  "Conversion URL must end in trailing asterisk (*)"
                ),
              observationWindow: number()
                .oneOf(
                  [1, 7, 30],
                  "Observation Window must be 1, 7, or 30 days."
                )
                .required("Observation Window required."),
              type: string()
                .oneOf(
                  ["postclick", "postview"],
                  "Conversion type must be Post Click or Post View"
                )
                .required("Conversion Type required."),
            })
          ),
        creatives: array()
          .min(1)
          .of(
            object().shape({
              name: string()
                .label("Creative Name")
                .required("Name is required"),
              title: string()
                .label("Title")
                .max(30, "Max 30 Characters")
                .required("Title is required"),
              body: string()
                .label("Body")
                .max(60, "Max 60 Characters")
                .required("Body is required"),
              targetUrlValid: boolean().isTrue("Please enter a valid URL."),
              targetUrl: string()
                .label("Target Url")
                .required("URL is required")
                .matches(NoSpacesRegex, `URL must not contain any whitespace`)
                .matches(
                  SimpleUrlRegexp,
                  `Please enter a valid URL, for example https://brave.com`
                ),
            })
          ),
      })
    ),
});
