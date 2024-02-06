import { boolean, object, string } from "yup";
import { t } from "@lingui/macro";


export const AdvertiserSchema = () =>
  object().shape({
    tracking: boolean()
      .default(false)
      .isTrue(t`Third party tracking acknowledgement is required`),
    payment: boolean()
      .default(false)
      .isTrue(t`Payment acknowledgement is required`),
    terms: boolean()
      .default(false)
      .isTrue(t`Terms & Conditions acknowledgement is required`),
    address: object().shape({
      id: string().nullable(),
      street1: string().required(t`Street address is required`),
      street2: string().nullable(),
      city: string().required(t`City is required`),
      state: string().nullable(),
      country: string().required(t`Country is required`),
      zipcode: string().nullable()
    }),
  });
