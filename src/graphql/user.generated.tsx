import * as Types from "./types";

import { gql } from "@apollo/client";
export type UserFragment = {
  __typename?: "User";
  email: string;
  emailVerified: boolean;
  fullName: string;
  id: string;
  role: string;
};

export const UserFragmentDoc = gql`
  fragment User on User {
    email
    emailVerified
    fullName
    id
    role
  }
`;
