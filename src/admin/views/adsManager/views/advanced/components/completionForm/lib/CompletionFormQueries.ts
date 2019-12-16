export function createCampaignMutation(createCampaignInput) {
    return `
    mutation{
        createCampaign(
            createCampaignInput: {
            userId: "${createCampaignInput.userId}"
            createCampaignRequestDTO: {
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
            }
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
            createCreativeSetRequestDTO: {
                execution: "${createAdSetInput.execution}"
                perDay: ${createAdSetInput.perDay}
                totalMax: ${createAdSetInput.totalMax}
                segments: ${createAdSetInput.segments}
            }
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
            createCreativeInstanceRequestDTO: {
                creativeSetId: "${createAdInput.creativeSetId}"
                creativeId: "${createAdInput.creativeId}"
                prices: [{amount: 123, type: "view"}, {amount: 567, type: "click"}]
                webhooks: [{type: "click", url: "https://www.google.com"}]
            }
        }
        ){
            id
        }
    }
`};