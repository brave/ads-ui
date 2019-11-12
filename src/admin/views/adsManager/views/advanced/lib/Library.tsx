export function processData(data) {
    let processedData = {} as any;
    processedData.campaign = initializeCampaign();
    processedData.adSets = initializeAdSets();
    processedData.ads = initializeAds();
    processedData.form = "campaignForm";
    return processedData;
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

