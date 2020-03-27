export function createCampaignMutation(createCampaignInput) {
    return `
    mutation{
        createCampaign(
            createCampaignInput: {
                userId: "${createCampaignInput.userId}"
                advertiserId: "${createCampaignInput.advertiserId}"
                name: "${createCampaignInput.name}"
                startAt: "${createCampaignInput.startAt}"
                endAt: "${createCampaignInput.endAt}"
                type: "paid"
                source: "direct"
                currency: "${createCampaignInput.currency}"
                budget: ${createCampaignInput.budget}
                dailyCap: ${createCampaignInput.dailyCap}
                dailyBudget: ${createCampaignInput.dailyBudget}
                geoTargets: ${createCampaignInput.geoTargets}
                state: "${createCampaignInput.state}"
                adSets: ${createCampaignInput.adSets}
            }
        ){
            id
        }
    }
`};

export function createAdSetMutation(createAdSetInput) {
    return `
    mutation{
        createAdSet(
            createAdSetInput: {
                campaignId: "${createAdSetInput.campaignId}"
                execution: "${createAdSetInput.execution}"
                perDay: ${createAdSetInput.perDay}
                totalMax: ${createAdSetInput.totalMax}
                segments: ${createAdSetInput.segments}
            }
        ){
            id
        }
    }
`};

export function createAdMutation(createAdInput) {
    return `
    mutation{
        createAd(
            createAdInput: {
                creativeSetId: "${createAdInput.creativeSetId}"
                creativeId: "${createAdInput.creativeId}"
                prices: ${createAdInput.price}
                webhooks: []
            }
        ){
            id
        }
    }
`};

export function createCreativeMutation(createCreativeInput) {
    return `
    mutation{
        createNotificationCreative(
            createNotificationCreativeInput: {
                advertiserId: "${createCreativeInput.advertiserId}"
                name: "${createCreativeInput.name}"
                payload: ${createCreativeInput.payload}
                type: ${createCreativeInput.type}
                state: "active"
            }
        ){
            id
        }
    }
`};