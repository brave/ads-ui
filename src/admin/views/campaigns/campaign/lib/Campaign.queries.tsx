import { gql } from "apollo-boost";

export const CAMPAIGN = gql`
query campaign($id: String!){
    campaign(id: $id) {
        id
        name
        state
        dailyCap
        priority
        passThroughRate
        pacingOverride
        externalId
        currency
        budget
        dailyBudget
        startAt
        endAt
        type
        dayPartings{
            dow
            startMinute
            endMinute
        }
        geoTargets{
            code
            name
        }
    }
    activeGeocodes {
        data {
            code
            name
        }
    }
}
`;

export const UPDATE_CAMPAIGN = gql`
mutation updateCampaign($updateCampaignInput: UpdateCampaignInput!){
    updateCampaign(updateCampaignInput: $updateCampaignInput) {
        id
        name
        state
        dailyCap
        priority
        passThroughRate
        pacingOverride
        externalId
        currency
        budget
        dailyBudget
        startAt
        endAt
        type
        dayPartings{
            dow
            startMinute
            endMinute
        }
        geoTargets{
            code
            name
        }
    }
}
`;