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
    initializedData.ads = initializeAds();
    initializedData.validations = initializeValidations();
    initializedData.form = "reviewForm";
    return initializedData;
}

export function validateCampaignForm(campaign) {
    let errors = [] as any;




    if (errors.length > 0) {
        return errors;
    }
    else {
        return 'valid';
    }
}

export function validateAdSetsForm(adSets) {
    let errors = [] as any;

    // adSets.forEach((adSet, index) => {
    // if (adSet.lifetimeImpressions === '') {
    //     errors.push(`Error in ad set ${index + 1}, please enter a number for lifetime impressions`)
    // }
    // if (adSet.dailyImpressions === '') {
    //     errors.push(`Error in ad set ${index + 1}, please enter a number for daily impressions`)
    // }
    // if (adSet.audiences === '') {
    //     errors.push(`Error in ad set ${index + 1}, please select at least one audience`)
    // }
    // });

    if (errors.length > 0) {
        return errors;
    }
    else {
        return 'valid';
    }
}

export function validateAdsForm(ads) {
    let errors = [] as any;

    // ads.forEach((ad, index) => {
    //     if (ad.creative === '') {
    //         errors.push(`Error in ad ${index + 1}, please select a creative`)
    //     }
    //     if (ad.adSets === '') {
    //         errors.push(`Error in ad ${index + 1}, please add to an ad set`)
    //     }
    // });

    if (errors.length > 0) {
        return errors;
    }
    else {
        return 'valid';
    }
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

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);




    // endTime: new Date().setHours(23, 59, 59, 999),

    let campaign = {
        name: '',
        startTime: (new Date(Date.now() - tzoffset)).toISOString().slice(0, -5),
        endTime: (new Date(new Date().setHours(23, 59, 59, 999) - tzoffset)).toISOString().slice(0, -5),
        dailyFrequencyCap: '',
        geoTargets: '',
        currency: '',
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
        }
    ]
    return adSets;
}

function initializeAds() {
    let ads = [
        {
            creative: '',
            adSets: '',
            newCreative: true,
            name: '',
            title: '',
            body: '',
            targetUrl: '',
            previewAssets: {
                title: null,
                body: null,
            }
        }
    ]
    return ads;
}

export function performValidation(context, campaign, adSets, ads) {

    let validations = initializeValidations();

    // TODO 
    // Add validations.campaignName.resolveMessage = null and validations.campaignName.resolveHook = null;
    // These can be displayed next to the error as a link back to the corresponding form element

    if (campaign.name === '') {
        validations.campaignName = {} as any;
        validations.campaignName.valid = false;
        validations.campaignName.errorMessage = "Campaign name is required";
    }
    if (campaign.startTime > campaign.endTime) {
        validations.schedule = {} as any;
        validations.schedule.valid = false;
        validations.schedule.errorMessage = "Campaign end date cannot be before start date";
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

    if (adSets) {
        adSets.forEach((adSet, index) => {
            validations.adSets.push({} as any);
            if (adSet.lifetimeImpressions === '') {
                validations.adSets[index].lifetimeImpressions = {} as any;
                validations.adSets[index].lifetimeImpressions.valid = false;
                validations.adSets[index].lifetimeImpressions.errorMessage = `Lifetime impressions is required in Ad Set ${index + 1}`;
            }
            if (adSet.dailyImpressions === '') {
                validations.adSets[index].dailyImpressions = {} as any;
                validations.adSets[index].dailyImpressions.valid = false;
                validations.adSets[index].dailyImpressions.errorMessage = `Daily impressions is required in Ad Set ${index + 1}`;
            }
            if (adSet.audiences === '') {
                validations.adSets[index].audiences = {} as any;
                validations.adSets[index].audiences.valid = false;
                validations.adSets[index].audiences.errorMessage = `Audiences are required in Ad Set ${index + 1}`;
            }
        })
    }

    if (ads) {
        ads.forEach((ad, index) => {
            validations.ads.push({} as any);
            if (ad.creative === '') {
                validations.ads[index].creative = {} as any;
                validations.ads[index].creative.valid = false;
                validations.ads[index].creative.errorMessage = `Ad creative is required in Ad ${index + 1}`;
            }
            if (ad.adSets === '') {
                validations.ads[index].adSets = {} as any;
                validations.ads[index].adSets.valid = false;
                validations.ads[index].adSets.errorMessage = `Ad sets are required in Ad ${index + 1}`;
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
        }

        // If ads validation triggered, set form to invalid
        if (key === 'ads') {
            if (validations.ads) {
                validations.ads.forEach((ad) => {
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

    context.setState({ validations });
}

function initializeValidations() {
    let validations = {
        valid: null,
        adSets: [] as any,
        ads: [] as any
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

