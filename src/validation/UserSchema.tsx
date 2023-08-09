import { object, string } from "yup";

export const UserSchema = object().shape({
  email: string().label("Email").required(),
  fullName: string().label("Full Name").required(),
});
