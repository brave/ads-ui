import * as _ from "lodash";

import { CREATE_FLIGHTS_SUCCESSFUL } from "../../actions";

export const serviceCampaignReducer = (state: any, action: any) => {
  switch (action.type) {
    case CREATE_FLIGHTS_SUCCESSFUL:
      const campaigns = _.map(state.campaigns, (campaign) => {
        if (campaign.id === action.payload.campaign) {
          campaign.flights = _.map(campaign.flights, (flight) => {
            if (flight.active === true) {
              flight.active = false;
            }
            return flight;
          });
          campaign.flights.push(action.payload);
        }
        return campaign;
      });
      return {
        campaigns,
      };
    default:
      return state;
  }
};
