import { gql } from "apollo-boost";

export const ORGANIZATION_CAMPAIGNS = gql`
query advertiser($id: String!){
    advertiser(id: $id) {
        id
        userAdvertisers{
            userId
        }
        campaigns{
            id
            name
            state
            currency
            budget
            spent
            pacingIndex
            startAt
            endAt
        }
    }
}
`;
