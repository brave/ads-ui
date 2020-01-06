import { creativeAssetsQuery, creativeTypeQuery } from "./AdsForm.queries";

// import ApolloClient from 'apollo-boost';
// import { gql } from 'apollo-boost';

// const client = new ApolloClient({
//     uri: `${process.env.REACT_APP_SERVER_ADDRESS}`.replace("v1", "graphql"),
//     request: (operation) => {
//         operation.setContext({
//             headers: {
//                 authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkcy1kZXZAYnJhdmUuY29tIiwiZW1haWxWZXJpZmllZCI6dHJ1ZSwiZXhwaXJlc0luIjozNjAwMDAwLCJpZCI6IjJjN2NlNjFiLWYxZGMtNDUwNS1iYTFiLTkwNGFmNmIxODZjMCIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTU3NDcyMzAwNSwiZXhwIjoxNTc4MzIzMDA1fQ.hFtSpVOj6dyXGjfaf7A1lg2BUrXr4B9RtEOygzfmJ2s`
//             }
//         })
//     }
// });

// export function test() {
//     client
//         .query({
//             query: gql`
//       {
//         campaignCount
//       }
//     `
//         })
//         .then(result => console.log(result));
// }

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