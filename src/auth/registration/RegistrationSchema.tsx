import { object, string } from "yup";

export const RegistrationSchema = object().shape({
  email: string().label("Email address").required(),
  firstName: string().label("First name").required(),
  lastName: string().label("Last name").required(),
  advertiser: object().shape({
    name: string().label("Organization name").required(),
    url: string().label("Organization URL").required(),
    phone: string().label("Organization Phone number").required(),
  }),
  address: object().shape({
    street1: string().label("Street address").required(),
    street2: string().label("Street address line 2"),
    city: string().label("City").required(),
    state: string().label("State").required(),
    country: string().label("Country").required(),
    zipcode: string().label("Zip / Postal Code").required(),
  }),
});
