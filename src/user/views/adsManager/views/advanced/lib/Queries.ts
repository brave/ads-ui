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

export function campaignQuery(campaignId) {
  return `
    query{campaign(id: "${campaignId}"){
      id
      name
      state
      startAt
      endAt
      dailyCap
      currency
      dailyBudget
      budget
      spent
      geoTargets{
        code
        name
      }
      adSets{
        id
        perDay
        totalMax
        billingType
        conversions{
          urlPattern
          type
          observationWindow
        }
        oses{
          code
          name     
        }
        segments{
          code 
          name
        }
        ads {
          id
          state
          prices{
            amount
          }
          creative{
            id
            state
            name
            payload {
            title
              body
              targetUrl
            }
          }
        }
      }
    }
  }
`};

