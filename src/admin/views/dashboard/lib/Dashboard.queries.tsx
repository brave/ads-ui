import gql from "graphql-tag";

const DASHBOARD_QUERY = gql`
query {
      userCount
      campaignCount
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


export default DASHBOARD_QUERY;
