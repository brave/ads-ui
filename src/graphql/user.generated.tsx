import { gql } from "@apollo/client";

export type UserFragment = {
  __typename?: "User";
  email: string;
  fullName: string;
  id: string;
  role: string;
};

export const UserFragmentDoc = gql`
  fragment User on User {
    email
    fullName
    id
    role
  }
`;
