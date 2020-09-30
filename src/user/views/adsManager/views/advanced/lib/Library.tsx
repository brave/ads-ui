import { activeGeocodesQuery, creativesQuery, segmentsQuery } from "./Queries";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.userId = getSearchParameters(context.props.location).userId;
    initializedData.advertiserId = getSearchParameters(context.props.location).advertiserId;
    initializedData.geoCodes = await initializeGeoCodes(activeGeocodesQuery, context.props.auth.accessToken);
    initializedData.segments = await initializeSegments(segmentsQuery, context.props.auth.accessToken);
    // initializedData.creatives = await initializeCreatives(creativesQuery, context.props.auth.accessToken, initializedData.advertiserId);
    // initializedData.creativeOptions = initializeCreativeOptions(initializedData.creatives);
    initializedData.campaign = initializeCampaign();
    initializedData.adSets = initializeAdSets();
    initializedData.selectedAdSet = 0;
    initializedData.selectedAd = 0;
    initializedData.validations = initializeValidations();
    initializedData.form = "campaignForm";
    return initializedData;
}

async function initializeGeoCodes(query, accessToken) {
    let data = await fetchData(query, accessToken)
    let response = [] as any;
    data.activeGeocodes.data.forEach((geocode) => {
        response.push({ value: geocode.code, label: geocode.name })
    });
    return response;
}

async function initializeSegments(query, accessToken) {
    let data = await fetchData(query, accessToken)
    let response = [] as any;
    data.segments.data.forEach((segment) => {
        if (segment.name !== 'untargeted') {
            response.push({ value: segment.code, label: segment.name })
        }
    });
    return response;
}

async function initializeCreatives(query, accessToken, advertiserId) {
    let data = await fetchData(query(advertiserId), accessToken)
    let response = [] as any;
    data.advertiser.creatives.forEach((creative) => {
        response.push({ id: creative.id, name: creative.name, state: creative.state })
    });
    return response;
}

function initializeCreativeOptions(creatives) {
    let creativeOptions = [] as any;
    creatives.forEach((creative) => {
        creativeOptions.push({
            value: creative.id, label: creative.name
        });
    });
    return creativeOptions;
}

function initializeCampaign() {

    // Calculate timezone offset in ms
    var tzoffset = (new Date()).getTimezoneOffset() * 60000;

    let campaign = {
        objective: '',
        name: '',
        startTime: (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5),
        endTime: (new Date(new Date().setHours(23, 59, 59, 999) - tzoffset)).toISOString().slice(0, -5),
        dailyFrequencyCap: '',
        geoTargets: '',
        currency: { value: 'usd', label: 'USD' },
        dailyBudget: '',
        totalBudget: '',
        cpm: true,
        cpc: false,
        bid: '',
    }
    return campaign;
}

function initializeAdSets() {
    let adSets = [
        {
            pricingType: { value: 'cpm', label: 'Impressions (cpm)' },
            bid: '',
            lifetimeImpressions: '',
            dailyImpressions: '',
            braveML: true,
            audiences: '',
            platforms: [
                { value: "_Bt5nxrNo", label: "macos" },
                { value: "k80syyzDa", label: "ios" },
                { value: "i1g4cO6Pl", label: "windows" },
                { value: "-Ug5OXisJ", label: "linux" },
                { value: "mbwfZU-4W", label: "android" },
            ],
            conversion: {
                type: 'postview',
                url: '',
                observationWindow: { value: 30, label: "30" },
            },
            ads: [
                {
                    creative: '',
                    newCreative: true,
                    name: '',
                    title: '',
                    body: '',
                    targetUrl: '',
                    creativeUrl: '',
                    size: '',
                    notificationAd: true,
                    inPageAd: false,
                    channels: '',
                    previewAssets: {
                        title: '',
                        body: '',
                        creativeUrl: '',
                    }
                }
            ]
        }
    ]
    return adSets;
}

// function initializeAds() {
//     let ads = [
//         {
//             creative: '',
//             adSets: '',
//             newCreative: true,
//             name: '',
//             title: '',
//             body: '',
//             targetUrl: '',
//             previewAssets: {
//                 title: null,
//                 body: null,
//             }
//         }
//     ]
//     return ads;
// }

export function performValidation(context, validationRule, campaign, adSets, ads) {

    let validations = initializeValidations();
    validations.adSets = [] as any;

    // TODO 
    // Add validations.campaignName.resolveMessage = null and validations.campaignName.resolveHook = null;
    // These can be displayed next to the error as a link back to the corresponding form element

    if (campaign.name === '') {
        validations.campaignName = {} as any;
        validations.campaignName.valid = false;
        validations.campaignName.errorMessage = "Campaign name is required, please set a campaign name.";
    }
    if (campaign.startTime > campaign.endTime && (validationRule === "campaignForm" || validationRule === 'all')) {
        validations.schedule = {} as any;
        validations.schedule.valid = false;
        validations.schedule.errorMessage = "Campaign end date cannot be before start date";
    }

    let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: "numeric" };
    let startTime = new Date(campaign.startTime).toLocaleDateString("en-US", options);
    let endTime = new Date(campaign.endTime).toLocaleDateString("en-US", options);

    if (startTime === "Invalid Date") {
        validations.startTime = {} as any;
        validations.startTime.valid = false;
        validations.startTime.errorMessage = "Start time is not valid, please select valid start time.";
    }

    if (endTime === "Invalid Date") {
        validations.endTime = {} as any;
        validations.endTime.valid = false;
        validations.endTime.errorMessage = "End time is not valid, please select valid start time.";
    }

    if (parseFloat(campaign.dailyBudget.replace(/[^\d.]/g, '')) > parseFloat(campaign.totalBudget.replace(/[^\d.]/g, '')) && (validationRule === "campaignForm" || validationRule === 'all')) {
        validations.budget = {} as any;
        validations.budget.valid = false;
        validations.budget.errorMessage = "Daily budget cannot be greater than lifetime budget.";
    }
    if (campaign.geoTargets === '' || campaign.geoTargets === null) {
        validations.geoTargets = {} as any;
        validations.geoTargets.valid = false;
        validations.geoTargets.errorMessage = "Locations are required, please choose at least one location.";
    }

    if (campaign.dailyBudget === '') {
        validations.dailyBudget = {} as any;
        validations.dailyBudget.valid = false;
        validations.dailyBudget.errorMessage = "Daily budget is required, please enter a daily budget.";
    }
    if (campaign.totalBudget === '') {
        validations.totalBudget = {} as any;
        validations.totalBudget.valid = false;
        validations.totalBudget.errorMessage = "Lifetime budget is required, please enter a lifetime budget.";
    }

    if (adSets) {
        adSets.forEach((adSet, adSetIndex) => {
            validations.adSets.push({} as any);

            if ((adSet.audiences === '' || adSet.audiences === null) && adSet.braveML === false) {
                validations.adSets[adSetIndex].audiences = {} as any;
                validations.adSets[adSetIndex].audiences.valid = false;
                validations.adSets[adSetIndex].audiences.errorMessage = `Audience is required, please select an audience.`;
            }

            if (adSet.pricingType === '' || adSet.pricingType === null) {
                validations.adSets[adSetIndex].pricingType = {} as any;
                validations.adSets[adSetIndex].pricingType.valid = false;
                validations.adSets[adSetIndex].pricingType.errorMessage = `Pricing type required, please select a pricing type.`;
            }

            // if (adSet.bid === '') {
            //     validations.adSets[adSetIndex].bid = {} as any;
            //     validations.adSets[adSetIndex].bid.valid = false;
            //     validations.adSets[adSetIndex].bid.errorMessage = `Bid is required, please enter a bid.`;
            // }

            // if (parseFloat(adSet.bid.replace(/[^\d.]/g, '')) > parseFloat(campaign.dailyBudget.replace(/[^\d.]/g, ''))) {
            //     validations.adSets[adSetIndex].bidBudget = {} as any;
            //     validations.adSets[adSetIndex].bidBudget.valid = false;
            //     validations.adSets[adSetIndex].bidBudget.errorMessage = `Bid cannot be greater than daily budget, please update bid.`;
            // }

            if (adSet.platforms === '' || adSet.platforms === null) {
                validations.adSets[adSetIndex].platforms = {} as any;
                validations.adSets[adSetIndex].platforms.valid = false;
                validations.adSets[adSetIndex].platforms.errorMessage = `Platform is required, please select at least one platform.`;
            }

            if (adSet.ads) {
                validations.adSets[adSetIndex].ads = [] as any;
                adSet.ads.forEach((ad, index) => {
                    validations.adSets[adSetIndex].ads.push({} as any);
                    if (ad.name === '') {
                        validations.adSets[adSetIndex].ads[index].name = {} as any;
                        validations.adSets[adSetIndex].ads[index].name.valid = false;
                        validations.adSets[adSetIndex].ads[index].name.errorMessage = `Creative name is required, please enter a creative name.`;
                    }
                    if (ad.title === '') {
                        validations.adSets[adSetIndex].ads[index].title = {} as any;
                        validations.adSets[adSetIndex].ads[index].title.valid = false;
                        validations.adSets[adSetIndex].ads[index].title.errorMessage = `Creative title is required, please enter a title for your creative.`;
                    }
                    if (ad.body === '') {
                        validations.adSets[adSetIndex].ads[index].body = {} as any;
                        validations.adSets[adSetIndex].ads[index].body.valid = false;
                        validations.adSets[adSetIndex].ads[index].body.errorMessage = `Creative body is required, please enter a body for your creative.`;
                    }
                    if (ad.targetUrl === '') {
                        validations.adSets[adSetIndex].ads[index].targetUrl = {} as any;
                        validations.adSets[adSetIndex].ads[index].targetUrl.valid = false;
                        validations.adSets[adSetIndex].ads[index].targetUrl.errorMessage = `Creative target url is required, please enter a target url for your creative.`;
                    }
                })
            }
        })
    }



    Object.keys(validations).forEach((key) => {
        // If campaign validation triggered, set form to invalid
        if (key !== 'valid' && key !== 'adSets' && key !== 'ads') {
            if (validations[key].valid === false) {
                validations.valid = false;
            }
        }

        // If ad set validation triggered, set form to invalid
        if (key === 'adSets') {
            if (validations.adSets) {
                validations.adSets.forEach((adSet) => {
                    if (Object.keys(adSet)) {
                        Object.keys(adSet).forEach((key) => {
                            if (adSet[key].valid === false) {
                                validations.valid = false;
                            }
                            if (key === "ads") {
                                if (adSet["ads"]) {
                                    adSet["ads"].forEach((ad) => {
                                        if (Object.keys(ad)) {
                                            Object.keys(ad).forEach((key) => {
                                                if (ad[key].valid === false) {
                                                    validations.valid = false;
                                                }
                                            });
                                        }
                                    })
                                }
                            }
                        });
                    }
                })
            }
        };
    });

    context.setState({ validations });
}

function initializeValidations() {
    let validations = {
        valid: null,
    } as any;
    return validations;
}

export function getSearchParameters(location) {
    var prmstr = location.search.substr(1);
    return prmstr != null && prmstr != "" ? transformToAssocArray(prmstr) : {} as any;
}

function transformToAssocArray(prmstr) {
    var params = {};
    var prmarr = prmstr.split("&");
    for (var i = 0; i < prmarr.length; i++) {
        var tmparr = prmarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }
    return params as any;
}

async function fetchData(query, accessToken) {
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

