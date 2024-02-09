import { boolean, object, string } from "yup";

export const AdvertiserSchema = object().shape({
  tracking: boolean()
    .default(false)
    .isTrue("Third party tracking acknowledgement is required"),
  payment: boolean()
    .default(false)
    .isTrue("Payment acknowledgement is required"),
  terms: boolean()
    .default(false)
    .isTrue("Terms & Conditions acknowledgement is required"),
  address: object().shape({
    id: string().nullable(),
    street1: string().label("Street address").required(),
    street2: string().label("Street address line 2").nullable(),
    city: string().label("City").required(),
    state: string().label("State / Province").required(),
    country: string().label("Country").required(),
    zipcode: string().label("Zip / Postal Code").required(),
  }),
});
