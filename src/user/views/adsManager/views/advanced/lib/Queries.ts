export const activeGeocodesQuery = `
    query{
        activeGeocodes{
            data{
                code
                name
            }
        }
    }
`;

export const segmentsQuery = `
    query{
        segments{
            data{
                code
                name
            }
        }
    }
`;

export function creativesQuery(advertiserId) {
    return `
    query{
        advertiser(id: "${advertiserId}"){
            creatives{
                    id
                    name
                    state
            }
        }
    }
`};

