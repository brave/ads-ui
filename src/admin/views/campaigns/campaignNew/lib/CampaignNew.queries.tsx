import { gql } from "apollo-boost";

export const CAMPAIGN_NEW = gql`
query activeGeocodes{
    activeGeocodes {
        data {
            code
            name
        }
    }
}
`;

export const CREATE_CAMPAIGN = gql`
mutation createCampaign($createCampaignInput: CreateCampaignInput!){
    createCampaign(createCampaignInput: $createCampaignInput) {
        id
        name
        state
        dailyCap
        currency
        budget
        externalId
        dailyBudget
        startAt
        endAt
        type
        geoTargets{
            code
            name
        }
    }
}
`;