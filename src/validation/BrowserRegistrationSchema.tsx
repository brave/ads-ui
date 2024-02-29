import { object, string } from "yup";
import { t } from "@lingui/macro";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
const DomainRegex = /^((?!-)[A-Za-z0-9-]{1,63}(?<!-)\\.)+[A-Za-z]{2,}$/;

export const BrowserRegistrationSchema = () =>
  UserDetailsSchema().shape({
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

export const SearchRegistrationSchema = () =>
  UserDetailsSchema().shape({
    advertiser: AdvertiserDetailsSchema().shape({
      url: string()
        .required(t`Domain is required`)
        .matches(NoSpacesRegex, t`Domain must not contain any whitespace`)
        .matches(
          DomainRegex,
          t`Please enter a valid domain, for example: brave.com`,
        )
        .when(["email"], ([email], schema) => {
          return schema.test(
            "email-matches-domain",
            t`Search domain must match email domain`,
            (value) => email.split("@")[1].includes(value),
          );
        }),
    }),
    mediaSpend: string().optional().nullable(),
    country: string()
      .required(t`Primary region of business is required`)
      .oneOf(
        ["US", "UK", "DE", "FR", "CA", "IN"],
        t`Primary region of business is required`,
      ),
  });

const UserDetailsSchema = () =>
  object().shape({
    fullName: string().required(t`Full name is required`),
    email: string()
      .required(t`Email address is required`)
      .matches(EmailRegex, t`Please enter a valid email address`),
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
