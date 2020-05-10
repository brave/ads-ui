import { gql } from "apollo-boost";

export const ORGANIZATIONS_LIST_OVERVIEW = gql`
query{
    advertisers {
        createdAt
        id
        name
        state
        billingEmail
    }
}
`;
