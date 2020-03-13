import { gql } from "apollo-boost";

export const CAMPAIGN_LIST_APPROVALS = gql`
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
        createdAt
        startAt
        endAt
        currency
        pacingIndex
    }
}
`;

export const APPROVE_CAMPAIGN = gql`
mutation approveCampaign($approveCampaignInput: ApproveCampaignInput!){
    approveCampaign(approveCampaignInput: $approveCampaignInput) {
        id
    }
}
`;

export const REJECT_CAMPAIGN = gql`
mutation rejectCampaign($rejectCampaignInput: RejectCampaignInput!){
    rejectCampaign(rejectCampaignInput: $rejectCampaignInput) {
        id
    }
}
`;
