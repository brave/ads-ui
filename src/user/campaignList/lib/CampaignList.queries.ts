import { gql } from "apollo-boost";

export const CAMPAIGN_LIST = gql`
query advertiser($id: String!) {
advertiser(id: $id){
    campaigns {
        id
        name
        state
        dailyBudget
        budget
        spent
        currency
        createdAt
        startAt
        endAt
        currency
        pacingIndex
    }
}
}
`;
