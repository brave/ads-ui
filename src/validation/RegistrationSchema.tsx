import { object, string } from "yup";

const SimpleUrlRegexp = /https:\/\/.+\.[a-zA-Z]{2,}\/?.*/g;
const NoSpacesRegex = /^\S*$/;
const HttpsRegex = /^https:\/\//;
const PhoneRegex = /^\+?[1-9]\d{10,14}$/;
const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const RegistrationSchema = object().shape({
  email: string()
    .label("Email address")
    .required()
    .matches(EmailRegex, "Please enter a valid email address"),
  firstName: string().label("First name").required(),
  lastName: string().label("Last name").required(),
  advertiser: object().shape({
    name: string().label("Organization name").required(),
    url: string()
      .label("Organization URL")
      .required()
      .matches(NoSpacesRegex, `URL must not contain any whitespace`)
      .matches(HttpsRegex, `URL must start with https://`)
      .matches(
        SimpleUrlRegexp,
        `Please enter a valid URL, for example https://brave.com`,
      ),
    phone: string()
      .label("Organization phone number")
      .required()
      .matches(
        PhoneRegex,
        "Please enter a valid phone number, including country code.",
      ),
  }),
  address: object().shape({
    street1: string().label("Street address").required(),
    street2: string().label("Street address line 2"),
    city: string().label("City / Town / Village / Locality").required(),
    state: string().label("State / Province / Canton / Post Town").required(),
    country: string().label("Country").required(),
    zipcode: string().label("Zip / Postal Code").required(),
  }),
});
