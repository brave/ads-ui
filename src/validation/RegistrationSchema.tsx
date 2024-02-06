import { object, string } from "yup";
import { t } from "@lingui/macro";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const RegistrationSchema = () =>
  object().shape({
    email: string()
      .required(t`Email address is required`)
      .matches(EmailRegex, t`Please enter a valid email address`),
    fullName: string().required(t`Full name is required`),
    advertiser: object().shape({
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
      marketingChannel: string().required(
        t`Please let us know how you heard about Brave Ads`,
      ),
      other: string().when("marketingChannel", {
        is: "other",
        then: (schema) =>
          schema.required(t`Please specify how you heard about Brave Ads`),
      }),
    }),
  });
