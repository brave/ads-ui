import { object, string } from "yup";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const RegistrationSchema = object().shape({
  email: string()
    .label("Email address")
    .required()
    .matches(EmailRegex, "Please enter a valid email address"),
  fullName: string().label("Full name").required(),
  advertiser: object().shape({
    name: string().label("Business name").required(),
    url: string()
      .label("Business website")
      .required()
      .matches(NoSpacesRegex, `URL must not contain any whitespace`)
      .matches(HttpsRegex, `URL must start with https://`)
      .matches(
        SimpleUrlRegexp,
        `Please enter a valid URL, for example https://brave.com`,
      ),
    description: string().required(
      "Please let us know why you're interested in Brave Ads",
    ),
    marketingChannel: string().required(
      "Please let us know how you heard about Brave Ads",
    ),
    other: string().when("marketingChannel", {
      is: "other",
      then: (schema) =>
        schema.required("Please specify how you heard about Brave Ads"),
    }),
  }),
  address: object().shape({
    street1: string().label("Street address").required(),
    street2: string().label("Street address line 2"),
    city: string().label("City").required(),
    state: string().label("State / Province").required(),
    country: string().label("Country").required(),
    zipcode: string().label("Zip / Postal Code").required(),
  }),
});
