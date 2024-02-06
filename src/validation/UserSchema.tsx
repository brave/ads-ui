import { object, string } from "yup";
import { t } from "@lingui/macro";

export const UserSchema = () =>
  object().shape({
    email: string().required(t`Email address is required`),
    fullName: string().required(t`Full name is required`),
  });
