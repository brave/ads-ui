import { gql } from "@apollo/client";

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
        type
        format
        engagements {
            createdat
            type
            count
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
