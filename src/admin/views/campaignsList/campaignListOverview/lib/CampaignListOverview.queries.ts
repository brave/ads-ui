import { gql } from "apollo-boost";

export const CAMPAIGN_LIST_OVERVIEW = gql`
query{
    campaigns {
        advertiser{
            id
            billingEmail
            name
            userAdvertisers{
            userId
        }
        }
        id
        name
        state
        budget
        spent
        startAt
        endAt
        currency
        pacingIndex
    }
}
`;
