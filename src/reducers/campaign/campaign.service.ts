import * as _ from "lodash";

import { ADD_FLIGHT_GEOTARGETING_SUCCESSFUL, CREATE_FLIGHTS_SUCCESSFUL } from "../../actions";

export const serviceCampaignReducer = (state: any, action: any) => {
  let campaigns;
  switch (action.type) {
    case CREATE_FLIGHTS_SUCCESSFUL:
      campaigns = _.map(state.campaigns, (campaign) => {
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
    case ADD_FLIGHT_GEOTARGETING_SUCCESSFUL:
      campaigns = _.map(state.campaigns, (campaign) => {
        if (campaign.id === action.payload.flight.campaign.id) {
          campaign.flights = _.map(campaign.flights, (flight) => {
            if (flight.id === action.payload.flight.id) {
              flight.geoTargetings.push(action.payload.geoCode);
            }
            return flight;
          });
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
