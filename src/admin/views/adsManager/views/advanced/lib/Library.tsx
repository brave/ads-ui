import { activeGeocodesQuery, creativesQuery, segmentsQuery } from "./Queries";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.userId = getSearchParameters(context.props.location).userId;
    initializedData.advertiserId = getSearchParameters(context.props.location).advertiserId;
    initializedData.geoCodes = await initializeGeoCodes(activeGeocodesQuery, context.props.auth.accessToken);
    initializedData.segments = await initializeSegments(segmentsQuery, context.props.auth.accessToken);
    initializedData.creatives = await initializeCreatives(creativesQuery, context.props.auth.accessToken, initializedData.advertiserId);
    initializedData.creativeOptions = initializeCreativeOptions(initializedData.creatives);
    initializedData.campaign = initializeCampaign();
    initializedData.adSets = initializeAdSets();
    initializedData.selectedAdSet = 0;
    initializedData.selectedAd = 0;
    initializedData.validations = initializeValidations();
    initializedData.form = "adsForm";
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
        name: '',
        startTime: (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5),
        endTime: (new Date(new Date().setHours(23, 59, 59, 999) - tzoffset)).toISOString().slice(0, -5),
        dailyFrequencyCap: '',
        geoTargets: '',
        currency: "BAT",
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
            lifetimeImpressions: '',
            dailyImpressions: '',
            braveML: true,
            audiences: '',
            conversionsCheckbox: false,
            conversion: {
                type: 'post-view',
                url: '',
                observationWindow: { value: 7, label: "7" },
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
        validations.campaignName.errorMessage = "Campaign name is required";
    }
    if (campaign.startTime > campaign.endTime && (validationRule === "campaignForm" || validationRule === 'all')) {
        validations.schedule = {} as any;
        validations.schedule.valid = false;
        validations.schedule.errorMessage = "Campaign end date cannot be before start date";
    }

    if (parseFloat(campaign.dailyBudget.replace(/[^\d.]/g, '')) > parseFloat(campaign.totalBudget.replace(/[^\d.]/g, '')) && (validationRule === "campaignForm" || validationRule === 'all')) {
        validations.budget = {} as any;
        validations.budget.valid = false;
        validations.budget.errorMessage = "Daily budget cannot be greater than Lifetime budget";
    }
    if (campaign.dailyFrequencyCap === '') {
        validations.dailyFrequencyCap = {} as any;
        validations.dailyFrequencyCap.valid = false;
        validations.dailyFrequencyCap.errorMessage = "Daily Frequency Cap is required";
    }
    if (campaign.geoTargets === '') {
        validations.geoTargets = {} as any;
        validations.geoTargets.valid = false;
        validations.geoTargets.errorMessage = "Geo Targets are required";
    }
    if (campaign.currency === '') {
        validations.currency = {} as any;
        validations.currency.valid = false;
        validations.currency.errorMessage = "Currency is required";
    }
    if (campaign.dailyBudget === '') {
        validations.dailyBudget = {} as any;
        validations.dailyBudget.valid = false;
        validations.dailyBudget.errorMessage = "Daily budget is required";
    }
    if (campaign.totalBudget === '') {
        validations.totalBudget = {} as any;
        validations.totalBudget.valid = false;
        validations.totalBudget.errorMessage = "Total budget is required";
    }
    if (campaign.bid === '') {
        validations.totalBudget = {} as any;
        validations.totalBudget.valid = false;
        validations.totalBudget.errorMessage = "Bid is required";
    }

    if (adSets) {
        adSets.forEach((adSet, adSetIndex) => {
            validations.adSets.push({} as any);
            if (adSet.lifetimeImpressions === '') {
                validations.adSets[adSetIndex].lifetimeImpressions = {} as any;
                validations.adSets[adSetIndex].lifetimeImpressions.valid = false;
                validations.adSets[adSetIndex].lifetimeImpressions.errorMessage = `Lifetime impressions is required in Ad Set ${adSetIndex + 1}`;
            }
            if (adSet.dailyImpressions === '') {
                validations.adSets[adSetIndex].dailyImpressions = {} as any;
                validations.adSets[adSetIndex].dailyImpressions.valid = false;
                validations.adSets[adSetIndex].dailyImpressions.errorMessage = `Daily impressions is required in Ad Set ${adSetIndex + 1}`;
            }
            if (adSet.audiences === '') {
                validations.adSets[adSetIndex].audiences = {} as any;
                validations.adSets[adSetIndex].audiences.valid = false;
                validations.adSets[adSetIndex].audiences.errorMessage = `Audiences are required in Ad Set ${adSetIndex + 1}`;
            }

            if (adSet.ads) {
                validations.adSets[adSetIndex].ads = [] as any;
                adSet.ads.forEach((ad, index) => {
                    validations.adSets[adSetIndex].ads.push({} as any);
                    if (ad.creative === '') {
                        validations.adSets[adSetIndex].ads[index].creative = {} as any;
                        validations.adSets[adSetIndex].ads[index].creative.valid = false;
                        validations.adSets[adSetIndex].ads[index].creative.errorMessage = `Ad creative is required in Ad ${index + 1} of Ad Set ${adSetIndex + 1}`;
                    }
                    if (ad.adSets === '') {
                        validations.adSets[adSetIndex].ads[index].adSets = {} as any;
                        validations.adSets[adSetIndex].ads[index].adSets.valid = false;
                        validations.adSets[adSetIndex].ads[index].adSets.errorMessage = `Ad sets are required in Ad ${index + 1} of Ad Set ${adSetIndex + 1}`;
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

