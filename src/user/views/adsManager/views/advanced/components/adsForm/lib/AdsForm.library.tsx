import { creativeAssetsQuery, creativeTypeQuery } from "./AdsForm.queries";

export async function fetchCreativeAssets(creativeId, accessToken) {
    return await fetchData(creativeAssetsQuery(creativeId), accessToken);
}

export async function fetchCreativeType(creativeId, accessToken) {
    return await fetchData(creativeTypeQuery(creativeId), accessToken);
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