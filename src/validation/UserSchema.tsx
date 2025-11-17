import { object, string } from "yup";

export const UserSchema = () =>
  object().shape({
    fullName: string().required("Full name is required"),
  });
