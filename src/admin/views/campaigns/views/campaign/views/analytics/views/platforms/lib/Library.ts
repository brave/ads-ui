import * as Highcharts from "highcharts";
let colors = ["#4C54D2CC", "#A0A5EBCC", "#9370DBCC", "#8B008BCC"];

export async function fetchData(accessToken, campaignId) {
    let url = `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql");
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
                query {
                    campaign(id: "${campaignId}"){
                        name
                        confirmationsSummary{
                            data{
                                type
                                android
                                iOS
                                macOS
                                windows
                                linux
                                other
                            }
                        }
                    }
                }
        `})
    };

    let response = await fetch(url, options);
    let json = await response.json();
    return json.data;
}

export function processData(data) {
    let processedData = {} as any;

    processedData.campaignName = data.campaign.name;
    processedData.androidEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "android")
    processedData.iOSEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "iOS")
    processedData.macOSEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "macOS")
    processedData.windowsEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "windows")
    processedData.linuxEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "linux")
    processedData.otherEngagements = processPlatformEngagements(data.campaign.confirmationsSummary.data, "other")

    return {
        campaignName: processedData.campaignName,
        androidEngagements: processedData.androidEngagements,
        iOSEngagements: processedData.iOSEngagements,
        macOSEngagements: processedData.macOSEngagements,
        windowsEngagements: processedData.windowsEngagements,
        linuxEngagements: processedData.linuxEngagements,
        otherEngagements: processedData.otherEngagements,
    };
}

function processPlatformEngagements(data, platform) {
    let [viewCount, clickCount, dismissCount, landedCount, upvoteCount, downvoteCount] = [0, 0, 0, 0, 0, 0];

    data.forEach(entry => {
        switch (entry.type) {
            case "view":
                viewCount += entry[platform];
                break;
            case "click":
                clickCount += entry[platform];
                break;
            case "dismiss":
                dismissCount += entry[platform];
                break;
            case "landed":
                landedCount += entry[platform];
                break;
            case "upvote":
                upvoteCount += entry[platform];
                break;
            case "downvote":
                downvoteCount += entry[platform];
                break;
        }
    });

    return {
        viewCount,
        clickCount,
        dismissCount,
        landedCount,
        upvoteCount,
        downvoteCount
    }
}

export function createPlatformChart(data, platform) {
    var platformChart = Highcharts.chart(platform, {
        chart: {
            type: 'pie',
            width: "290",
            height: "290",
        },
        credits: {
            enabled: false
        },
        title: {
            text: `Engagement ${platform.charAt(0).toUpperCase() + platform.slice(1)}`,
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        series: [{
            colorByPoint: true,
            data: [
                {
                    name: 'Views',
                    y: data.viewCount,
                    color: colors[0]
                }, {
                    name: 'Clicks',
                    y: data.clickCount,
                    color: colors[1]
                }, {
                    name: 'Dismiss',
                    y: data.dismissCount,
                    color: colors[2]
                }, {
                    name: '10s Visits',
                    y: data.landCount,
                    color: colors[3]
                }] as any
        }] as any
    });
}