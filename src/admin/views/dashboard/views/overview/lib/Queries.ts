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
    }
    `;

export default dashboardQuery;