import { object, string } from "yup";
import { t } from "@lingui/macro";

export const UserSchema = () =>
  object().shape({
    fullName: string().required(t`Full name is required`),
  });
