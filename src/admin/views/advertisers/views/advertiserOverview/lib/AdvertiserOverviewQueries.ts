export function advertiserQuery(advertiserId) {
    return `
    query{
        advertiser(id: "${advertiserId}")
        {
            id
            createdAt
            modifiedAt
            name
            agreed
            state
            phone
            billingEmail
            mailingAddress {
                modifiedAt
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