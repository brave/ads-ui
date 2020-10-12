import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { useState } from "react";

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}


const colors = ["#4C54D2CC", "#A0A5EBCC", "#9370DBCC", "#8B008BCC"];


export const downloadCSV = async (campaignId, campaignName, accessToken, userId, setDownloadingCSV) => {
    setDownloadingCSV(true);
    axios(`${process.env.REACT_APP_SERVER_ADDRESS}/report/campaign/csv/${campaignId}`, {
        headers: {
            "Authorization": `Bearer ${accessToken}`,
            "-x-user": userId,
            "Content-Type": "text/csv",
        }
    })
        .then(response => {
            setDownloadingCSV(false);
            const file = new Blob(
                [response.data],
                { type: 'text/csv', endings: 'transparent' });
            const fileURL = URL.createObjectURL(file);
            const link = document.createElement('a');
            link.href = fileURL;
            link.setAttribute('download', `${campaignName}.csv`);
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => {
        });
}



export const prepareSankey = (impressions, clicks, landings, conversions) => {
    console.log(impressions);
    return {
        chart: {
            type: "spline",
            height: "169",
        },
        title: {
            text: undefined
        },
        credits: {
            enabled: false
        },
        xAxis: {
            categories: ["Impressions", "Clicks", "10s Visits"],
        },
        yAxis: {
            title: {
                text: undefined
            },
            opposite: true,
            visible: false,
            min: 0,
            max: impressions
        },
        tooltip: {
            shared: true
        },
        legend: {
            enabled: false
        },
        series: [{
            name: 'Count',
            data: [impressions, clicks, landings],
            color: colors[0]
        }] as any
    } as any;
}

export const prepareChart = (metric1, metric1DataSet, metric2, metric2DataSet, metric3, metric3DataSet, metric4, metric4DataSet) => {

    const decideAxis = (metric) => {
        switch (metric) {
            case 'impressions':
            case 'clicks':
            case 'landings':
            case 'conversions':
            case 'dismissals':
            case 'upvotes':
            case 'downvotes':
                return 0;
            case 'ctr':
            case 'convRate':
            case 'landingRate':
                return 1
        }
    }

    const decideValueSuffix = (metric) => {
        switch (metric) {
            case 'impressions':
            case 'clicks':
            case 'landings':
            case 'conversions':
            case 'dismissals':
            case 'upvotes':
            case 'downvotes':
                return undefined;
            case 'ctr':
            case 'convRate':
            case 'landingRate':
                return "%"
        }
    }

    const decideLabel = (metric) => {
        switch (metric) {
            case 'impressions':
                return "Impressions";
            case 'clicks':
                return "Clicks";
            case 'landings':
                return "Landings";
            case 'conversions':
                return "Conversions";
            case 'dismissals':
                return "Dismissals";
            case 'upvotes':
                return "Upvotes";
            case 'downvotes':
                return "Downvotes";
            case 'ctr':
                return "C.T.R.";
            case 'convRate':
                return "Conversion Rate";
            case 'landingRate':
                return "10s Visit Rate";
        }
    }

    return {
        chart: {
            type: "spline",
            zoomType: "x",
            height: "364",
            spacingTop: 40,
            spacingBottom: 10,
            spacingRight: 0,
            spacingLeft: 0,
        },
        title: {
            text: undefined
        },
        credits: {
            enabled: false
        },
        tooltip: {
            shared: true
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: [{
            opposite: false,
            title: {
                text: undefined
            },
            tickAmount: 3,

        },
        {
            opposite: true,
            title: {
                text: undefined
            },
            tickAmount: 3,
            max: 100,
            min: 0,

        }],
        legend: {
            enabled: false
        },
        plotOptions: {
            animation: false,
            spline: {
                connectNulls: true,
                marker: {
                    symbol: "circle",
                    radius: 4
                }
            },
            series: {
                animation: false
            }
        },
        series: [{
            animation: false,
            name: decideLabel(metric1),
            yAxis: decideAxis(metric1),
            data: metric1DataSet,
            connectNulls: true,
            color: colors[0],
            tooltip: {
                valueSuffix: decideValueSuffix(metric1)
            }
        },
        {
            animation: false,
            name: decideLabel(metric2),
            yAxis: decideAxis(metric2),
            data: metric2DataSet,
            connectNulls: true,
            color: colors[1],
            tooltip: {
                valueSuffix: decideValueSuffix(metric2)
            }
        },
        {
            animation: false,
            name: decideLabel(metric3),
            yAxis: decideAxis(metric3),
            data: metric3DataSet,
            connectNulls: true,
            color: colors[2],
            tooltip: {
                valueSuffix: decideValueSuffix(metric3)
            }
        },
        {
            animation: false,
            name: decideLabel(metric4),
            yAxis: decideAxis(metric4),
            data: metric4DataSet,
            connectNulls: true,
            color: colors[3],
            tooltip: {
                valueSuffix: decideValueSuffix(metric4)
            }
        }] as any
    } as any;
}



// Process Data 

const mapGroupingName = (grouping) => {
    switch (grouping) {
        case 'hourly':
            return "hour"
        case 'daily':
            return "day"
        case 'weekly':
            return "week"
        case "monthly":
            return "month"
    }
}

const compare = (a, b) => {
    var dateA = new Date(a[0]);
    var dateB = new Date(b[0]);
    //@ts-ignore
    return dateA - dateB;

}

const initializeMetricValue = (metric) => {
    switch (metric) {
        case 'impressions':
        case 'clicks':
        case 'landings':
        case 'conversions':
        case 'dismissals':
        case 'upvotes':
        case 'downvotes':
            return 0;
        case 'ctr':
        case 'convRate':
        case 'landingRate':
            return { numerator: 0, denominator: 0 }
    }
}

const calcMetricValue = (metric, metricValue) => {
    if (metric === "ctr" || metric === "convRate" || metric === "landingRate") {
        return parseFloat(((metricValue.numerator / metricValue.denominator) * 100).toFixed(2));
    }
    else {
        return metricValue;
    }
}

const getValueForEngagement = (engagement, metric) => {
    switch (metric) {
        case 'impressions':
            return engagement.type === "view" ? engagement.count : 0
        case 'clicks':
            return engagement.type === "click" ? engagement.count : 0
        case 'landings':
            return engagement.type === "landed" ? engagement.count : 0
        case 'conversions':
            return engagement.type === "conversion" ? engagement.count : 0
        case 'dismissals':
            return engagement.type === "dismiss" ? engagement.count : 0
        case 'upvotes':
            return engagement.type === "upvote" ? engagement.count : 0
        case 'downvotes':
            return engagement.type === "downvote" ? engagement.count : 0
        case 'ctr':
            if (engagement.type === "click") {
                return { numerator: engagement.count }
            }
            if (engagement.type === "view") {
                return { denominator: engagement.count }
            }
            else {
                return { numerator: 0 }
            }
        case 'convRate':
            if (engagement.type === "conversion") {
                return { numerator: engagement.count }
            }
            if (engagement.type === "click") {
                return { denominator: engagement.count }
            }
            else {
                return { numerator: 0 }
            }
        case 'landingRate':
            if (engagement.type === "landed") {
                return { numerator: engagement.count }
            }
            if (engagement.type === "click") {
                return { denominator: engagement.count }
            }
            else {
                return { numerator: 0 }
            }
    }
}

const applyEngagementValue = (metricValue, metricEngagementValue, metric) => {
    switch (metric) {
        case 'impressions':
        case 'clicks':
        case 'landings':
        case 'conversions':
        case 'dismissals':
        case 'upvotes':
        case 'downvotes':
            return metricValue + metricEngagementValue;
        case 'ctr':
        case 'convRate':
        case 'landingRate':
            if (metricEngagementValue.numerator) {
                metricValue.numerator += metricEngagementValue.numerator;
            }
            if (metricEngagementValue.denominator) {
                metricValue.denominator += metricEngagementValue.denominator;
            }
            return metricValue
    }
}

export const processData = (engagements, metric1, metric2, metric3, metric4, grouping) => {

    // Group data by user setting
    let groupedData = _.groupBy(engagements, function (engagement) {
        //@ts-ignore
        return moment(engagement.createdat).startOf(mapGroupingName(grouping));
    });

    // Calculate totals
    let [impressions, clicks, dismissals, landings, conversions, upvotes, downvotes, ctr, convRate, landingRate, popularity] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    engagements.forEach((engagement) => {
        switch (engagement.type) {
            case 'view':
                impressions += engagement.count;
                break;
            case 'click':
                clicks += engagement.count;
                break;
            case 'dismiss':
                dismissals += engagement.count;
                break;
            case 'landed':
                landings += engagement.count;
                break;
            case 'conversion':
                conversions += engagement.count;
                break;
            case 'upvote':
                upvotes += engagement.count;
                break;
            case 'downvote':
                downvotes += engagement.count;
                break;
        }
    });

    ctr = clicks / impressions;
    convRate = conversions / clicks;
    landingRate = landings / clicks;
    popularity = upvotes / (upvotes + downvotes)

    // Create data sets for chart 

    let metric1DataSet = [] as any;
    let metric2DataSet = [] as any;
    let metric3DataSet = [] as any;
    let metric4DataSet = [] as any;

    for (var key in groupedData) {

        let date = new Date(key).getTime();
        let metric1Value = initializeMetricValue(metric1);
        let metric2Value = initializeMetricValue(metric2);
        let metric3Value = initializeMetricValue(metric3);
        let metric4Value = initializeMetricValue(metric4);

        groupedData[key].forEach((engagement) => {
            let metric1EngagementValue = getValueForEngagement(engagement, metric1);
            let metric2EngagementValue = getValueForEngagement(engagement, metric2);
            let metric3EngagementValue = getValueForEngagement(engagement, metric3);
            let metric4EngagementValue = getValueForEngagement(engagement, metric4);

            metric1Value = applyEngagementValue(metric1Value, metric1EngagementValue, metric1);
            metric2Value = applyEngagementValue(metric2Value, metric2EngagementValue, metric2);
            metric3Value = applyEngagementValue(metric3Value, metric3EngagementValue, metric3);
            metric4Value = applyEngagementValue(metric4Value, metric4EngagementValue, metric4);
        });

        metric1DataSet.push([date, calcMetricValue(metric1, metric1Value)]);
        metric2DataSet.push([date, calcMetricValue(metric2, metric2Value)])
        metric3DataSet.push([date, calcMetricValue(metric3, metric3Value)])
        metric4DataSet.push([date, calcMetricValue(metric4, metric4Value)])
    }

    metric1DataSet = metric1DataSet.sort(compare)
    metric2DataSet = metric2DataSet.sort(compare)
    metric3DataSet = metric3DataSet.sort(compare)
    metric4DataSet = metric4DataSet.sort(compare)

    return {
        impressions,
        clicks,
        landings,
        dismissals,
        conversions,
        ctr,
        convRate,
        landingRate,
        upvotes,
        downvotes,
        metric1DataSet,
        metric2DataSet,
        metric3DataSet,
        metric4DataSet
    } as any;

}

export const formatMetric = (data, metric) => {
    switch (metric) {
        case 'impressions':
        case 'clicks':
        case 'landings':
        case 'conversions':
        case 'dismissals':
        case 'upvotes':
        case 'downvotes':
            return data[metric].toLocaleString();
        case 'ctr':
        case 'convRate':
        case 'landingRate':
            return (data[metric] * 100).toFixed(2) + "%";
    }
}

export const tempMetric = (data, metric) => {
    switch (metric) {
        case 'viewVisitRate':
            return ((data["landings"] / data["impressions"] * 100).toFixed(2) + "%");
        case 'viewDismissalRate':
            return ((data["dismissals"] / data["impressions"] * 100).toFixed(2) + "%");
    }
}

export const budgetMetric = (budget, currency) => {
    return budget + " " + currency;
}
