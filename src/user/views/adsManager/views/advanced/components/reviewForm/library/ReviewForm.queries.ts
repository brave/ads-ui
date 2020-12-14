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
                externalId: ""
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

export function updateCampaignMutation(updateCampaignInput) {
    return `
    mutation{
        updateCampaign(
            updateCampaignInput: {
                id: "${updateCampaignInput.id}"
                name: "${updateCampaignInput.name}"
                startAt: "${updateCampaignInput.startAt}"
                endAt: "${updateCampaignInput.endAt}"
                externalId: ""
                type: "paid"
                currency: "${updateCampaignInput.currency}"
                budget: ${updateCampaignInput.budget}
                dailyCap: ${updateCampaignInput.dailyCap}
                dailyBudget: ${updateCampaignInput.dailyBudget}
                geoTargets: ${updateCampaignInput.geoTargets}
                state: "${updateCampaignInput.state}"
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
                billingType: "${createAdSetInput.billingType}"
                execution: "${createAdSetInput.execution}"
                perDay: ${createAdSetInput.perDay}
                totalMax: ${createAdSetInput.totalMax}
                segments: ${createAdSetInput.segments}
                oses: ${createAdSetInput.oses}
                conversions: ${createAdSetInput.conversions}
            }
        ){
            id
        }
    }
`};

export function updateAdSetMutation(createAdSetInput) {
    return `
    mutation{
        updateAdSet(
            updateAdSetInput: {
                id: "${createAdSetInput.id}"
                campaignId: "${createAdSetInput.campaignId}"
                billingType: "${createAdSetInput.billingType}"
                execution: "${createAdSetInput.execution}"
                perDay: ${createAdSetInput.perDay}
                totalMax: ${createAdSetInput.totalMax}
                segments: ${createAdSetInput.segments}
                oses: ${createAdSetInput.oses}
                conversions: ${createAdSetInput.conversions}
            }
        ){
            id
        }
    }
`};

export function createAdMutation(createAdInput) {
    console.log(createAdInput);
    return `
    mutation{
        createAd(
            createAdInput: {
                creativeSetId: "${createAdInput.creativeSetId}"
                state: "${createAdInput.state}"
                creativeId: "${createAdInput.creativeId}"
                prices: ${createAdInput.prices}
                webhooks: []
            }
        ){
            id
        }
    }
`};

export function updateAdMutation(createAdInput) {
    return `
    mutation{
        updateAd(
            updateAdInput: {
                id: "${createAdInput.id}"
                state: "${createAdInput.state}"
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
                userId: "${createCreativeInput.userId}"
                advertiserId: "${createCreativeInput.advertiserId}"
                name: "${createCreativeInput.name}"
                payload: ${createCreativeInput.payload}
                type: ${createCreativeInput.type}
                state: "under_review"
            }
        ){
            id
        }
    }
`};

export function updateCreativeMutation(createCreativeInput) {
    return `
    mutation{
        updateNotificationCreative(
            updateNotificationCreativeInput: {
                userId: "${createCreativeInput.userId}"
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