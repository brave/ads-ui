import { gql } from "apollo-boost";

export const ANALYTICS_OVERVIEW = gql`
query campaign($id: String!) {
campaign(id: $id){
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
        engagements {
            createdat
            type
            count
            currency
            price
            android
            ios
            linux
            macos
            windows
            other
        }
}
}
`;