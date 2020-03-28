import { createCampaignMutation, createCreativeMutation } from "./ReviewForm.queries";
import normalizeUrl from 'normalize-url';


async function processAdSets(adSets, userId, advertiserId, accessToken, campaign) {
    let createAdSetsInput = [] as any;
    if (adSets) {
        for (const adSet of adSets) {
            let createAdSetInput = {
                execution: "per_click",
                perDay: 1,
                totalMax: 10,
                billingType: adSet.pricingType.value,
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

            createAdSetInput.segments = segments;

            let platforms = [] as any;

            if (adSet.platforms) {
                adSet.platforms.forEach((platform) => {
                    let entry = {
                        code: platform.value,
                        name: platform.label
                    }
                    platforms.push(entry);
                });
            }

            createAdSetInput.oses = platforms;

            let conversions = [] as any;

            if (adSet.conversion.url !== '') {
                conversions.push({
                    urlPattern: adSet.conversion.url,
                    type: adSet.conversion.type,
                    observationWindow: adSet.conversion.observationWindow.value
                })
            }

            createAdSetInput.conversions = conversions;

            let ads = await processAds(adSet, userId, advertiserId, accessToken, campaign);
            createAdSetInput.ads = ads;
            createAdSetsInput.push(createAdSetInput);
        }
    }
    return createAdSetsInput;
}


// Prepare the graphql input for requesting 
async function processCampaign(userId, advertiserId, campaign, adSets, accessToken) {

    let createCampaignInput = {
        userId,
        advertiserId,
        name: campaign.name,
        startAt: new Date(campaign.startTime),
        endAt: new Date(campaign.endTime),
        type: "paid",
        source: "direct",
        currency: campaign.currency.label,
        budget: campaign.totalBudget.replace(/[^0-9\.]/g, ''),
        dailyBudget: campaign.dailyBudget.replace(/[^0-9\.]/g, ''),
        dailyCap: 1,
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

    // Good up to here, now process Ad Sets. 
    // let adSetsInput = await processAdSets(adSets, userId, advertiserId, accessToken);

    // createCampaignInput.adSets = JSON.stringify(adSetsInput);


    createCampaignInput.adSets = adSetNumberFilter(JSON.stringify(await processAdSets(adSets, userId, advertiserId, accessToken, campaign)).replace(/\"([^(\")"]+)\":/g, "$1:"));

    return createCampaignInput;
}

function adSetNumberFilter(adsets) {
    return adsets.replace(/"([0-9]+\.{0,1}[0-9]*)"/g, "$1");
}

async function processAds(adSet, userId, advertiserId, accessToken, campaign) {

    let createAdInput = [] as any;

    if (adSet.ads) {

        for (const ad of adSet.ads) {

            let creativeId = await processCreativeId(ad, advertiserId, accessToken, userId);

            let entry = {} as any;

            entry.creativeId = creativeId;

            if (adSet.pricingType.value === "cpm") {
                entry.prices = [{ amount: adSet.bid.replace(/[^0-9\.]/g, ''), type: "view" }]
            }
            else {
                entry.prices = [{ amount: adSet.bid.replace(/[^0-9\.]/g, ''), type: "click" }]
            }

            // if (adSet.pricingType.value === "cpm" && campaign.currency.label === "USD") {
            //     entry.prices = [{ amount: 20, type: "view" }]
            //     console.log(entry.prices);
            // }
            // else if (adSet.pricingType.value === "cpm" && campaign.currency.label === "BAT") {
            //     entry.prices = [{ amount: 70, type: "view" }]
            //     console.log(entry.prices);
            // }
            // else if (adSet.pricingType.value === "cpc" && campaign.currency.label === "USD") {
            //     entry.prices = [{ amount: .20, type: "click" }]
            //     console.log(entry.prices);
            // }
            // else if (adSet.pricingType.value === "cpc" && campaign.currency.label === "BAT") {
            //     entry.prices = [{ amount: 1, type: "click" }]
            //     console.log(entry.prices);
            // }

            entry.webhooks = [];

            createAdInput.push(entry);

        }

        return createAdInput;

    }
}

async function processCreativeId(ad, advertiserId, accessToken, userId) {

    if (ad.creative !== '') {
        return ad.creative.value;
    }
    else {
        let createCreativeInput = {
            advertiserId,
            userId,
            name: ad.name,
        } as any;

        let type = JSON.stringify({
            code: "notification_all_v1", name: "notification"
        }).replace(/\"([^(\")"]+)\":/g, "$1:");
        createCreativeInput.type = type;

        let payload = JSON.stringify({
            title: ad.title,
            body: ad.body,
            targetUrl: normalizeUrl(ad.targetUrl, { forceHttps: true })
        }).replace(/\"([^(\")"]+)\":/g, "$1:");

        createCreativeInput.payload = payload;
        let newCreative = await graphQLRequest(createCreativeMutation(createCreativeInput), accessToken);
        return newCreative.createNotificationCreative.id;
    }
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

export async function submitOrder(userId, advertiserId, campaign, adSets, accessToken) {
    let processedCampaign = await processCampaign(userId, advertiserId, campaign, adSets, accessToken)
    let test = await graphQLRequest(createCampaignMutation(processedCampaign), accessToken);
}
