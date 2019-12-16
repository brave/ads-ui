import { createAdMutation, createAdSetMutation, createCampaignMutation } from "./CompletionFormQueries";

export function prepareCreateCampaignInput(userId, advertiserId, campaign) {
    let createCampaignInput = {
        userId,
        advertiserId,
        name: campaign.name,
        startAt: campaign.startTime._d,
        endAt: campaign.endTime._d,
        type: "paid",
        source: "direct",
        currency: campaign.currency.label,
        budget: campaign.totalBudget,
        dailyBudget: campaign.dailyBudget,
        dailyCap: campaign.dailyFrequencyCap,
    } as any;

    if (campaign.status === true) {
        createCampaignInput.state = "active";
    }
    else {
        createCampaignInput.state = "draft";
    }

    let geoTargets = [] as any;
    if (campaign.geoTargets) {
        campaign.geoTargets.forEach((geoTarget) => {
            let entry = {
                code: geoTarget.value,
                name: geoTarget.label
            }
            geoTargets.push(entry);
        })
    }
    geoTargets = JSON.stringify(geoTargets).replace(/\"([^(\")"]+)\":/g, "$1:");
    createCampaignInput.geoTargets = geoTargets;
    return createCampaignInput;
}

export function prepareCreateAdSetsInput(campaignId, adSets) {
    let createAdSetsInput = [] as any;
    if (adSets) {
        adSets.forEach((adSet) => {
            let createAdSetInput = {
                campaignId,
                execution: "per_click",
                perDay: adSet.dailyImpressions,
                totalMax: adSet.lifetimeImpressions,
            } as any;
            let segments = [] as any;
            if (adSet.audiences) {
                adSet.audiences.forEach((audience) => {
                    let entry = {
                        code: audience.value,
                        name: audience.label
                    }
                    segments.push(entry);
                })
            }
            segments = JSON.stringify(segments).replace(/\"([^(\")"]+)\":/g, "$1:");
            createAdSetInput.segments = segments;
            createAdSetsInput.push(createAdSetInput);
        });
    }
    return createAdSetsInput;
}

export function prepareCreateAdInput(adSetId, ad) {
    let createAdInput = {
        creativeSetId: adSetId,
        creativeId: ad.creative.value,
    } as any;

    let prices = [] as any;

    if (ad.viewPricing) {
        prices.push({
            type: "view",
            amount: ad.viewPricing
        })
    }

    if (ad.clickPricing) {
        prices.push({
            type: "click",
            amount: ad.clickPricing
        })
    }

    if (ad.conversionPricing) {
        prices.push({
            type: "conversion",
            amount: ad.conversionPricing
        })
    }

    prices = JSON.stringify(prices).replace(/\"([^(\")"]+)\":/g, "$1:");
    createAdInput.prices = prices;

    let webhooks = [] as any;

    if (ad.viewWebhook) {
        webhooks.push({
            type: "view",
            url: ad.viewWebhook
        })
    }

    if (ad.clickWebhook) {
        webhooks.push({
            type: "click",
            url: ad.clickWebhook
        })
    }

    if (ad.conversionWebhook) {
        webhooks.push({
            type: "conversion",
            url: ad.conversionWebhook
        })
    }

    webhooks = JSON.stringify(webhooks).replace(/\"([^(\")"]+)\":/g, "$1:");
    createAdInput.webhooks = webhooks;
    return createAdInput;
}

export async function createCampaign(createCampaignInput, accessToken) {
    let query = createCampaignMutation(createCampaignInput);
    let response = await graphQLRequest(query, accessToken)
    return response;
}

export async function createAdSet(createAdSetInput, accessToken) {
    let query = createAdSetMutation(createAdSetInput);
    let response = await graphQLRequest(query, accessToken);
    return response;
}

export async function createAd(createAdInput, accessToken) {
    let query = createAdMutation(createAdInput);
    let response = await graphQLRequest(query, accessToken);
    return response;
}




async function graphQLRequest(query, accessToken) {
    let url = `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql");
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
    };

    let response = await fetch(url, options);
    let json = await response.json();
    return json.data;
}