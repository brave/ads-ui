import { advertiserQuery } from "./AdvertiserOverviewQueries";

export async function initializeData(context) {
    let initializedData = {} as any;
    initializedData.advertiser = await initializeAdvertiser(context.props.match.params.advertiserId, context.props.auth.accessToken);
    return initializedData;
}

async function initializeAdvertiser(advertiserId, accessToken) {
    let data = await fetchData(advertiserQuery(advertiserId), accessToken)
    let response = data.advertiser;
    return response;
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