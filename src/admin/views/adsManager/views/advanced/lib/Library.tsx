import { activeGeocodesQuery, creativesQuery, segmentsQuery } from "./Queries";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.userId = getSearchParameters(context.props.location).userId;
    initializedData.advertiserId = getSearchParameters(context.props.location).advertiserId;
    initializedData.geoCodes = await initializeGeoCodes(activeGeocodesQuery, context.props.auth.accessToken);
    initializedData.segments = await initializeSegments(segmentsQuery, context.props.auth.accessToken);
    initializedData.creatives = await initializeCreatives(creativesQuery, context.props.auth.accessToken, initializedData.advertiserId);
    initializedData.campaign = initializeCampaign();
    initializedData.adSets = initializeAdSets();
    initializedData.ads = initializeAds();
    initializedData.form = "campaignForm";
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

    adSets.forEach((adSet, index) => {
        if (adSet.lifetimeImpressions === '') {
            errors.push(`Error in ad set ${index + 1}, please enter a number for lifetime impressions`)
        }
        if (adSet.dailyImpressions === '') {
            errors.push(`Error in ad set ${index + 1}, please enter a number for daily impressions`)
        }
        if (adSet.audiences === '') {
            errors.push(`Error in ad set ${index + 1}, please select at least one audience`)
        }
        if (adSet.audiences === '') {
            errors.push(`Error in ad set ${index + 1}, please select a status`)
        }
    });

    if (errors.length > 0) {
        return errors;
    }
    else {
        return 'valid';
    }
}

export function validateAdsForm(ads) {
    let errors = [] as any;

    ads.forEach((ad, index) => {
        if (ad.adSets === '') {
            errors.push(`Error in ad ${index + 1}, please add to an ad set`)
        }
    });

    if (errors.length > 0) {
        return errors;
    }
    else {
        return 'valid';
    }
}

async function initializeGeoCodes(query, accessToken) {
    let response = await fetchData(query, accessToken);
    return response.activeGeocodes.data;
}

async function initializeSegments(query, accessToken) {
    let response = await fetchData(query, accessToken);
    return response.segments.data;
}

async function initializeCreatives(query, accessToken, advertiserId) {
    let response = await fetchData(query(advertiserId), accessToken);
    return response.advertiser.creativeList.data;
}

function initializeCampaign() {
    let campaign = {
        name: '',
        startTime: new Date(),
        endTime: new Date().setHours(23, 59, 59, 999),
        dailyFrequencyCap: '',
        geoTargets: '',
        currency: '',
        dailyBudget: '',
        totalBudget: '',
        status: '',
    }
    return campaign;
}

function initializeAdSets() {
    let adSets = [
        {
            lifetimeImpressions: '',
            dailyImpressions: '',
            audiences: '',
            status: '',
        }
    ]
    return adSets;
}

function initializeAds() {
    let ads = [
        {
            creative: '',
            viewPricing: '',
            clickPricing: '',
            conversionPricing: '',
            webookURL: '',
            adSets: '',
        }
    ]
    return ads;
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

