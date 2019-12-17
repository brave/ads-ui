import { createAdMutation, createAdSetMutation, createCampaignMutation, createCreativeMutation } from "./CompletionFormQueries";

export async function submitOrder(userId, advertiserId, campaign, adSets, ads, accessToken) {
    let processedAds = await processAds(ads, advertiserId, accessToken);
    let processedAdSets = processAdSets(adSets, processedAds, campaign);
    let processedCampaign = processCampaign(campaign, processedAdSets, userId, advertiserId);
    // make request on processedCampaign; 

    console.log(processedAds);
    console.log(processedAdSets);
    console.log(processedCampaign);

    let test = await graphQLRequest(createCampaignMutation(processedCampaign), accessToken);
    console.log(test);
}


// returns this [{adSetIndices: [0, 1, 2], creativeId: "1234-abcdefg-3456"}, {adSetIndices: [4, 5, 6], creativeId: "1234-abcdefg-3456"}]

async function processAds(ads, advertiserId, accessToken) {
    let processedAds = [] as any;
    if (ads) {
        ads.forEach(async (ad) => {
            let adSetIndices = processAdSetIndices(ad.adSets);
            let creativeId = await processCreativeId(ad, advertiserId, accessToken)
            processedAds.push({ adSetIndices, creativeId })
        });
    }
    return processedAds;
};

// Prepare the graphql input in such a way that in processCampaign, we can just add 
// createCampaignInput.adSets = processAdSets(); 

// {
// execution:"per_click",perDay:1,totalMax:12,segments:[{code:"Svp7l-zGN",name:"untargeted"}],
// conversion: [{observationWindow: 7, urlPattern: "https://wwww.brave.com", type: "post_view"}]
// ads:[{
// creativeId: "201064a7-d92e-46fd-9a76-2568756b44c4"
// prices: [{type: "click", amount: 12}]
// webhooks: []
// }, {
// creativeId: "bed27a4b-ab33-4732-bd2f-0c17d76c7173"
// prices: [{type: "click", amount: 14}]
// webhooks: []
// }]
// }

function processAdSets(adSets, ads, campaign) {
    let createAdSetsInput = [] as any;
    if (adSets) {
        adSets.forEach((adSet, index) => {
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
            createAdSetInput.ads = processAdSetAds(ads, index, campaign)
            createAdSetsInput.push(createAdSetInput);
        });
    }
    return createAdSetsInput;
}



// Prepare the graphql input for requesting 
function processCampaign(campaign, adSets, userId, advertiserId) {
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
    createCampaignInput.adSets = adSetNumberFilter(JSON.stringify(adSets).replace(/\"([^(\")"]+)\":/g, "$1:"));
    return createCampaignInput;
}

function adSetNumberFilter(adsets) {
    return adsets.replace(/"([0-9]+\.{0,1}[0-9]*)"/g, "$1");
}

function processAdSetIndices(adSets) {
    let adSetIndices = [] as any;
    if (adSets) {
        adSets.forEach((adSet) => {
            adSetIndices.push(adSet.value);
        })
    }
    return adSetIndices;
}


function processAdSetAds(ads, index, campaign) {

    let createAdInput = [] as any;

    if (ads) {
        console.log("level 1");
        console.log(ads);
        console.log(JSON.stringify(ads));
        ads.forEach((ad) => {
            console.log("level 2");
            console.log(ad);
            console.log(JSON.stringify(ad));
            if (ad.adSetIndices) {
                console.log("level 3");
                console.log(ad.adSetIndices);
                console.log(JSON.stringify(ad.adSetIndices));
                ad.adSetIndices.forEach((adSetIndex) => {

                    console.log(`${adSetIndex} which is a ${typeof adSetIndex}, is === ${index} which is a ${typeof index}? ${adSetIndex === index}`)
                    if (adSetIndex === index) {

                        let entry = {
                            creativeId: ad.creativeId
                        } as any;

                        if (campaign.cpm) {
                            entry.prices = [{ amount: campaign.bid.replace(/[^0-9\.]/g, ''), type: "view" }]
                        }
                        else {
                            entry.prices = [{ amount: campaign.bid.replace(/[^0-9\.]/g, ''), type: "click" }]
                        }

                        entry.webhooks = [];

                        createAdInput.push(entry);

                    }
                });
            }
        })
    }
    return createAdInput;
}

async function processCreativeId(ad, advertiserId, accessToken) {

    if (ad.creative !== '') {
        return ad.creative.value;
    }
    else {
        let createCreativeInput = {
            advertiserId,
            name: ad.name,
        } as any;

        let type = JSON.stringify({
            code: "notification_all_v1", name: "notification"
        }).replace(/\"([^(\")"]+)\":/g, "$1:");
        createCreativeInput.type = type;

        let payload = JSON.stringify({
            title: ad.title,
            body: ad.body,
            targetUrl: ad.targetUrl
        }).replace(/\"([^(\")"]+)\":/g, "$1:");

        createCreativeInput.payload = payload;
        let newCreative = await graphQLRequest(createCreativeMutation(createCreativeInput), accessToken);
        return newCreative.createCreative.id;
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


        // ads - 
        // [{
        // adSets: [{value: 0, name: 'adset1'}, {value: 1, name: "adset2"}]
        // creative: {creativeId: '', name: "Dan", title: "A Creative", body: "a body", targetUrl: "https://www.brave.com", newCreative: true }
        // },
        // { 
        // adSets: [{value: 0, name: 'adset1'}, {value: 1, name: "adset2"}] 
        // creative: {creativeId: 'abcdefg-highjkls', name: "", title: "", body: "", targetUrl: "", newCreative: false }
        // }
        //]