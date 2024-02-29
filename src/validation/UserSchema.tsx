import { object, string } from "yup";
import { t } from "@lingui/macro";

const EmailRegex =
  /^(?!.*@(email\.com|example\.com|test\.com))[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

export const UserSchema = () =>
  object().shape({
    email: string()
      .required(t`Email address is required`)
      .matches(EmailRegex, t`Please enter a valid email address`),
    fullName: string().required(t`Full name is required`),
  });
