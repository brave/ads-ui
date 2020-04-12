let dashboardQuery = `
    query {
      userCount
      campaignCount
      confirmationCount
      campaignsPerCountry {
        data {
          country
          count
        }
      }
      campaignsPerCurrency {
        data {
          currency
          count
        }
      }
      campaigns {
        state
      }
    }
    `;

export default dashboardQuery;