import { createAdMutation, createAdSetMutation, createCampaignMutation } from "./CompletionFormQueries";

export function prepareCreateCampaignInput(userId, advertiserId, campaign, adSets) {

    let startTime = new Date(campaign.startTime);
    let endTime = new Date(campaign.endTime);

    let createCampaignInput = {
        userId,
        advertiserId,
        name: campaign.name,
        startAt: startTime,
        endAt: endTime,
        type: "paid",
        source: "direct",
        currency: campaign.currency.label,
        budget: campaign.totalBudget.replace(/[^0-9\.]/g, ''),
        dailyBudget: campaign.dailyBudget.replace(/[^0-9\.]/g, ''),
        dailyCap: campaign.dailyFrequencyCap,
        state: "under_review"
    } as any;

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
    let adSetsInput = prepareCreateAdSetsInput(adSets);
    createCampaignInput.adSets = adSetNumberFilter(JSON.stringify(adSetsInput).replace(/\"([^(\")"]+)\":/g, "$1:"));
    return createCampaignInput;
}

function adSetNumberFilter(adsets) {
    return adsets.replace(/"([0-9]+\.{0,1}[0-9]*)"/g, "$1");
}

export function prepareCreateAdSetsInput(adSets) {
    let createAdSetsInput = [] as any;
    if (adSets) {
        adSets.forEach((adSet) => {
            let createAdSetInput = {
                execution: "per_click",
                perDay: adSet.dailyImpressions,
                totalMax: adSet.lifetimeImpressions,
            } as any;
            let segments = [] as any;

            if (adSet.braveML === true) {
                segments.push({
                    code: "Svp7l-zGN",
                    name: "untargeted"
                });
            }
            else {
                if (adSet.audiences) {
                    adSet.audiences.forEach((audience) => {
                        let entry = {
                            code: audience.value,
                            name: audience.label
                        }
                        segments.push(entry);
                    })
                }
            }
            segments = segments;
            createAdSetInput.segments = segments;
            createAdSetsInput.push(createAdSetInput);
        });
    }
    return createAdSetsInput;
}

export function prepareCreateAdInput(adSetId, ad, campaign) {
    let createAdInput = {
        creativeSetId: adSetId,
        creativeId: ad.creative.value,
    } as any;

    if (campaign.cpm) {
        createAdInput.price = `[{ amount: ${campaign.bid.replace(/[^0-9\.]/g, '')}, type: "view" }]`
    }
    else {
        createAdInput.price = `[{ amount: ${campaign.bid.replace(/[^0-9\.]/g, '')}, type: "click" }]`
    }

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