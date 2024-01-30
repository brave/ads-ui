import { object, string } from "yup";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const PhoneRegex = /^\+?[1-9]\d{10,14}$/;
const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const RegistrationSchema = object().shape({
  email: string()
    .label("Email")
    .required()
    .matches(EmailRegex, "Please enter a valid email address"),
  fullName: string().label("Full name").required(),
  advertiser: object().shape({
    name: string().label("Company name"),
    url: string()
      .label("Company website")
      .required()
      .matches(NoSpacesRegex, `URL must not contain any whitespace`)
      .matches(HttpsRegex, `URL must start with https://`)
      .matches(
        SimpleUrlRegexp,
        `Please enter a valid URL, for example https://brave.com`,
      ),
    phone: string()
      .label("Company phone number")
      .matches(
        PhoneRegex,
        "Please enter a valid phone number, that has no spaces, and includes country code.",
      ),
    description: string().required(
      "Please let us know why you are interested in Brave Ads",
    ),
  }),
  address: object({
    street1: string().label("Street address"),
    street2: string().label("Street address line 2"),
    city: string().label("City / Town / Village / Locality"),
    state: string().label("State / Province / Canton / Post Town"),
    country: string().label("Country"),
    zipcode: string().label("Zip / Postal Code"),
  }).nullable(),
});
