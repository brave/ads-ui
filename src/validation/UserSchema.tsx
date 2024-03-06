import { object, string } from "yup";
import { t } from "@lingui/macro";

export const UserSchema = () =>
  object().shape({
    email: string()
      .required(t`Email address is required`)
      .email(t`Please enter a valid email address`),
    fullName: string().required(t`Full name is required`),
  });
