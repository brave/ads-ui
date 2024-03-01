import { object, string } from "yup";
import { t } from "@lingui/macro";
import { UserSchema } from "validation/UserSchema";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const DomainRegex = /^(?!-)[A-Za-z0-9-]+([-.][a-z0-9]+)*\.[A-Za-z]{2,6}$/;

const BrowserRegistrationSchema = () =>
  object().shape({
    user: UserSchema(),
    advertiser: AdvertiserDetailsSchema().shape({
      name: string().required(t`Business name is required`),
      url: string()
        .required(t`Business Website is required`)
        .matches(NoSpacesRegex, t`Website must not contain any whitespace`)
        .matches(HttpsRegex, t`Website must start with https://`)
        .matches(
          SimpleUrlRegexp,
          t`Please enter a valid URL, for example https://brave.com`,
        ),
      description: string().required(
        t`Please let us know why you're interested in Brave Ads`,
      ),
    }),
  });

const SearchRegistrationSchema = () =>
  object().shape({
    user: UserSchema(),
    advertiser: AdvertiserDetailsSchema(),
    domain: string()
      .required(t`Domain is required`)
      .matches(NoSpacesRegex, t`Domain must not contain any whitespace`)
      .matches(
        DomainRegex,
        t`Please enter a valid domain, for example: brave.com`,
      )
      .test(
        "is-matching-domain",
        t`Domain must match the email domain`,
        (value, context) => {
          const email = context.parent.user.email;
          if (!email) return false;
          const splitEmail = email.split("@");
          return value === splitEmail[splitEmail.length - 1];
        },
      ),
    mediaSpend: string().optional().nullable(),
    country: string()
      .required(t`Primary region of business is required`)
      .oneOf(
        ["US", "UK", "DE", "FR", "CA", "IN"],
        t`Primary region of business is required`,
      ),
  });

const AdvertiserDetailsSchema = () =>
  object().shape({
    marketingChannel: string().required(
      t`Please let us know how you heard about Brave Ads`,
    ),
    other: string().when("marketingChannel", {
      is: "other",
      then: (schema) =>
        schema.required(t`Please specify how you heard about Brave Ads`),
    }),
  });

export function RegistrationSchema(format: "search" | "browser") {
  if (format === "search") {
    return SearchRegistrationSchema();
  } else {
    return BrowserRegistrationSchema();
  }
}
