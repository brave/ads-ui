import * as _ from "lodash";

import { ADD_FLIGHT_GEOTARGETING_SUCCESSFUL, CREATE_FLIGHTS_SUCCESSFUL, ICampaignAction } from "../../actions";
import { ICampaignState } from "./campaign.interface";

export const serviceCampaignReducer = (state: ICampaignState, action: ICampaignAction): ICampaignState => {
  let campaigns;
  switch (action.type) {
    case CREATE_FLIGHTS_SUCCESSFUL:
      campaigns = _.map(state.campaigns, (campaign) => {
        if (campaign.id === (action.payload as any).campaign) {
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
        if (campaign.id === (action.payload as any).flight.campaign.id) {
          campaign.flights = _.map(campaign.flights, (flight) => {
            if (flight.id === (action.payload as any).flight.id) {
              flight.geoTargetings.push((action.payload as any).geoCode);
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
