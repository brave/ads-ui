import query from "./Queries";
import json from "./GeoData";
import geoCodes from "./GeoCodes";

export async function fetchData(accessToken) {
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

export function processData(data) {
    let processedData = {} as any;

    processedData.campaignCount = data.campaignCount.toLocaleString();
    processedData.confirmationCount = data.confirmationCount.toLocaleString();
    processedData.userCount = data.userCount.toLocaleString();

    processedData.campaignsPerCountryChartOptions =
        processCampaignsPerCountryChartOptions(data.campaignsPerCountry.data);

    processedData.campaignsPerCountryTableData =
        processCampaignsPerCountryTableData(data.campaignsPerCountry.data);

    processedData.percentCampaignsBAT =
        processPercentCampaignsBAT(data.campaignsPerCurrency.data);

    processedData.campaignsUnderReview =
        processCampaignsUnderReview(data.campaigns).toLocaleString();

    return {
        loading: false,
        campaignCount: processedData.campaignCount,
        confirmationCount: processedData.confirmationCount,
        userCount: processedData.userCount,
        campaignsPerCountryChartOptions: processedData.campaignsPerCountryChartOptions,
        campaignsPerCountryTableData: processedData.campaignsPerCountryTableData,
        campaignsUnderReview: processedData.campaignsUnderReview,
        percentCampaignsBAT: processedData.percentCampaignsBAT
    };
}

export function processCampaignsPerCountryChartOptions(data) {
    let chartData: any[] = []
    data.forEach((entry) => {
        chartData.push([
            entry.country.toLowerCase(),
            entry.count
        ]);
    });

    let chartOptions = {
        chart: {
            map: json as any
        },
        credits: {
            enabled: false
        },

        title: {
            text: undefined
        },
        legend: {
            enabled: false
        },

        colorAxis: {
            min: 0
        },
        colors: ['#4C54D2'],
        series: [{
            data: chartData,
            name: 'Campaigns',
            states: {
                hover: {
                    color: '#A0A5EB'
                }
            }
        }] as any
    };
    return chartOptions;
}

export function processCampaignsPerCountryTableData(data) {

    const activatedCountries = ["CA", "US", "GB", "FR", "DE", "IE", "AU", "NZ", "AR", "AT", "BR", "CH", "CL", "CO",
        "DK", "EC", "IL", "IN", "IT", "JP", "KR", "MX", "NL", "PE", "PH", "PL", "SE", "SG", "VE", "ZA", "KY", "AE",
        "AL", "AZ", "BD", "BE", "BG", "CN", "CZ", "DZ", "EG", "ES", "FI", "GR", "HK", "HR", "HU", "ID", "IQ", "KH",
        "LT", "MA", "MY", "NG", "NO", "PK", "PT", "RO", "RS", "RU", "SA", "SI", "SK", "TH", "TR", "TW", "UA", "VN",
        "OTHER"
    ];

    let tableData: any[] = []

    data.forEach((entry) => {
        tableData.push({
            country: entry.country,
            count: entry.count
        });
    });

    activatedCountries.forEach((activatedCountry) => {
        let found = false;
        tableData.forEach((entry) => {
            if (entry.country === activatedCountry) {
                found = true;
            }
        })
        if (!found) {
            tableData.push({
                country: activatedCountry,
                count: 0
            })
        }
    })

    tableData.forEach((entry, index) => {
        geoCodes.forEach((geoCode) => {
            if (entry.country === geoCode.code) {
                tableData[index] = {
                    country: geoCode.name,
                    count: entry.count
                }
            }
        })
    })

    return tableData;
}

export function processCampaignsUnderReview(data) {
    let campaignsUnderReview = 0;
    if (data) {
        data.forEach((campaign) => {
            if (campaign.state === "under_review") {
                campaignsUnderReview++;
            }
        })
    }
    return campaignsUnderReview;
}

export function processPercentCampaignsBAT(data) {
    let BATCount = 0;
    let USDCount = 0;
    data.forEach((entry) => {
        switch (entry.currency) {
            case "USD":
                USDCount += entry.count;
                return;
            case "BAT":
                BATCount += entry.count;
                return;
        }
    });

    return (
        parseFloat(((BATCount / (BATCount + USDCount)) * 100).toFixed(2))
    )
}


