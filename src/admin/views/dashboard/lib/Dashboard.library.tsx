import HighchartsWorldMap from "./HighchartsWorldMap";

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
            map: HighchartsWorldMap as any,
            height: "364",
            spacingTop: 40,
            spacingBottom: 10,
            spacingRight: -10,
            spacingLeft: -10,
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
        colors: ['#9370DBCC'],
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

// const colors = ["#4C54D2CC", "#A0A5EBCC", "", "#8B008BCC"];