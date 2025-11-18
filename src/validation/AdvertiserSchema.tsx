import { boolean, object, string } from "yup";

export const AdvertiserSchema = () =>
  object().shape({
    tracking: boolean()
      .default(false)
      .isTrue("First party tracking acknowledgement is required"),
    language: boolean()
      .default(false)
      .isTrue("Language acknowledgement is required"),
    payment: boolean()
      .default(false)
      .isTrue("Payment acknowledgement is required"),
    terms: boolean()
      .default(false)
      .isTrue("Terms & Conditions acknowledgement is required"),
    address: object().shape({
      id: string().nullable(),
      street1: string().required("Street address is required"),
      street2: string().nullable(),
      city: string().required("City is required"),
      state: string().nullable(),
      country: string().required("Country is required"),
      zipcode: string().nullable(),
    }),
  });
