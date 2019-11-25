export function advertiserQuery(advertiserId) {
    return `
    query{
        advertiser(id: "${advertiserId}")
        {
            id
            name
            agreed
            state
            phone
            billingEmail
            mailingAddress {
                street1
                street2
                city
                state
                country
                zipcode
            }
        }
    }
`};

export function updateAdvertiserMutation(updateAdvertiserInput) {
    return `
    mutation{
        updateAdvertiser(
        updateAdvertiserInput: ${JSON.stringify(updateAdvertiserInput).replace(/\"([^(\")"]+)\":/g, "$1:")}
        ){
            id
        }
    }
    `
};