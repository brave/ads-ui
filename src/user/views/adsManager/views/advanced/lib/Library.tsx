import moment from "moment";
import { activeGeocodesQuery, campaignQuery, creativesQuery, segmentsQuery } from "./Queries";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.userId = getSearchParameters(context.props.location).userId;
    initializedData.advertiserId = getSearchParameters(context.props.location).advertiserId;
    initializedData.campaignId = getSearchParameters(context.props.location).campaignId;
    initializedData.geoCodes = await initializeGeoCodes(activeGeocodesQuery, context.props.auth.accessToken);
    initializedData.segments = await initializeSegments(segmentsQuery, context.props.auth.accessToken);
    // TODO - Merge these two vars into one

    let values = await initializeCampaign(campaignQuery, initializedData.campaignId, context.props.auth.accessToken);
    [initializedData.campaign, initializedData.adSets] = await initializeCampaign(campaignQuery, initializedData.campaignId, context.props.auth.accessToken);
    initializedData.selectedAdSet = 0;
    initializedData.selectedAd = 0;
    initializedData.validations = initializeValidations();
    initializedData.form = "campaignForm";

    console.log(initializedData);

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

async function initializeCampaign(query, campaignId, accessToken) {

    let campaign;
    let adSets = [] as any;


    if (campaignId) {
        let data = await fetchData(query(campaignId), accessToken)

        let geoTargets = [] as any;
        data.campaign.geoTargets.forEach((geoCode) => {
            geoTargets.push({ value: geoCode.code, label: geoCode.name })
        });
        if (geoTargets.length === 0) {
            geoTargets = '';
        }

        let currency = { value: 'usd', label: 'USD' };
        if (data.campaign.currency === "BAT") {
            currency = { value: 'bat', label: 'BAT' };
        }

        let formatBudget = (budget) => {
            let formattedString = budget.toString().replace(/[^\d.]/g, '');
            formattedString = parseFloat(formattedString).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            if (currency.label === "USD") {
                formattedString = "$" + formattedString;
            }
            else {
                formattedString = formattedString + " BAT";
            }
            if (formattedString.includes("NaN")) {
                formattedString = '';
            }
            return formattedString
        }

        let state = 'active'

        if (data.campaign.state === "active" || data.campaign.state === "daycomplete") {
            state = 'active'
        } else if (data.campaign.state === "under_review") {
            state = 'under_review'
        } else {
            state = 'paused'
        }

        let price = data.campaign.adSets[0].ads[0].prices[0].amount;

        let globalBillingType = { value: 'cpm', label: 'Impressions (cpm)' };
        if (data.campaign.adSets[0].billingType === 'cpc') {
            globalBillingType = { value: 'cpc', label: 'Clicks (cpc)' };
        }

        campaign = {
            objective: '',
            id: campaignId,
            state,
            name: data.campaign.name,
            startTime: moment(data.campaign.startAt).format('YYYY-MM-DD[T]HH:mm'),
            endTime: moment(data.campaign.endAt).format('YYYY-MM-DD[T]HH:mm'),
            dailyFrequencyCap: data.campaign.dailyCap,
            geoTargets,
            currency,
            dailyBudget: formatBudget(data.campaign.dailyBudget),
            totalBudget: formatBudget(data.campaign.budget),
            spend: formatBudget(data.campaign.spent),
            editMode: true,
            price: formatBudget(price),
            globalBillingType
        }

        data.campaign.adSets.forEach((adSet) => {
            let pricingType = { value: 'cpm', label: 'Impressions (cpm)' };
            if (adSet.billingType === 'cpc') {
                pricingType = { value: 'cpc', label: 'Clicks (cpc)' };
            }
            let audiences = [] as any;
            let braveML = false;
            adSet.segments.forEach((segment) => {
                audiences.push({ value: segment.code, label: segment.name })
            })
            if (audiences.length === 0) {
                audiences = '';
                braveML = true;
            }
            let platforms = [] as any;
            adSet.oses.forEach((os) => {
                platforms.push({ value: os.code, label: os.name })
            })
            if (platforms.length === 0) {
                platforms = [
                    { value: "_Bt5nxrNo", label: "macos" },
                    { value: "k80syyzDa", label: "ios" },
                    { value: "i1g4cO6Pl", label: "windows" },
                    { value: "-Ug5OXisJ", label: "linux" },
                    { value: "mbwfZU-4W", label: "android" },
                ];
            }
            if (platforms.length === 0) {
                platforms = [
                    { value: "_Bt5nxrNo", label: "macos" },
                    { value: "k80syyzDa", label: "ios" },
                    { value: "i1g4cO6Pl", label: "windows" },
                    { value: "-Ug5OXisJ", label: "linux" },
                    { value: "mbwfZU-4W", label: "android" },
                ];
            }

            let conversion = {
                type: 'postview',
                url: '',
                observationWindow: { value: 30, label: "30" },
            } as any;

            if (adSet.conversions[0]) {
                conversion = {
                    type: adSet.conversions[0].type,
                    url: adSet.conversions[0].urlPattern,
                    observationWindow: { value: adSet.conversions[0].observationWindow, label: adSet.conversions[0].observationWindow.toString() }
                }
            }

            let ads = [] as any;

            adSet.ads.forEach((ad) => {
                if (ad.state !== 'deleted') {
                    let state = 'active'

                    if (ad.creative.state === "active") {
                        state = 'active'
                    } else if (ad.creative.state === "under_review") {
                        state = 'under_review'
                    }
                    else {
                        state = 'paused'
                    }
                    ads.push({
                        id: ad.id,
                        creative: ad.creative.id,
                        newCreative: false,
                        state,
                        name: ad.creative.name,
                        title: ad.creative.payload.title,
                        body: ad.creative.payload.body,
                        targetUrl: ad.creative.payload.targetUrl,
                        creativeUrl: '',
                        size: '',
                        notificationAd: true,
                        inPageAd: false,
                        channels: '',
                        previewAssets: {
                            title: ad.creative.payload.title,
                            body: ad.creative.payload.body,
                            creativeUrl: '',
                        }
                    });
                }
            })

            adSets.push({
                id: adSet.id,
                newAdSet: false,
                pricingType,
                bid: formatBudget(price),
                lifeTimeImpressions: adSet.totalMax,
                dailyImpressions: adSet.perDay,
                braveML,
                audiences,
                platforms,
                conversion,
                ads
            })
        });
    } else {

        campaign = {
            objective: '',
            id: '',
            name: '',
            startTime: moment().format('YYYY-MM-DD[T]HH:mm'),
            endTime: moment().add(1, "month").format('YYYY-MM-DD[T]HH:mm'),
            dailyFrequencyCap: '',
            geoTargets: '',
            currency: { value: 'usd', label: 'USD' },
            dailyBudget: '',
            totalBudget: '',
            cpm: true,
            cpc: false,
            bid: '',
            state: "active",
            editMode: false
        }



        adSets = [
            {
                id: '',
                newAdSet: true,
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
                        id: '',
                        creative: '',
                        newCreative: true,
                        state: 'under_review',
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

    }

    return [campaign, adSets];
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
    if (moment(campaign.startTime) > moment(campaign.endTime) && (validationRule === "campaignForm" || validationRule === 'all')) {
        validations.schedule = {} as any;
        validations.schedule.valid = false;
        validations.schedule.errorMessage = "Campaign end date cannot be before start date";
    }

    if (campaign.editMode) {
        if (moment(campaign.endTime) < moment() && (validationRule === "campaignForm" || validationRule === 'all')) {
            validations.endTimeSchedule = {} as any;
            validations.endTimeSchedule.valid = false;
            validations.endTimeSchedule.errorMessage = "Campaign end date can only be updated to the future";
        }
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

    if (campaign.editMode) {
        if (parseFloat(campaign.totalBudget.replace(/[^\d.]/g, '')) < parseFloat(campaign.spend.replace(/[^\d.]/g, '')) && (validationRule === "campaignForm" || validationRule === 'all')) {
            validations.budgetSpend = {} as any;
            validations.budgetSpend.valid = false;
            validations.budgetSpend.errorMessage = "Budget cannot be less than current campaign spend.";
        }
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

