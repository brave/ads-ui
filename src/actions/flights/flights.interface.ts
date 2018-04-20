import { IGeocodePayload, ISegmentPayload } from "..";
import { ICampaignPayload } from "../campaigns";

export interface IFlightAction {
  type: string;
  payload:
  ICreateFlightPayload |
  IFlightPayload |
  IFlightPayload[] |
  IFlightDayPartingPayload |
  IFlightGeoTargetingPayload |
  IFlightSegmentPayload |
  null;
}

export interface ICreateFlightPayload {
  order: string;
  geoOperator: string;
  startedAt: string;
  endAt: string;
  campaign: ICampaignPayload;
}

export interface IFlightPayload {
  id: string;
  createdAt: string;
  modifiedAt: string;
  order: number;
  geoOperator: string;
  startedAt: string;
  endAt: string;
  campaign: ICampaignPayload;
  active: boolean;
  geoTargetings: IGeocodePayload[];
  segments: ISegmentPayload[];
  datPartings: IFlightDayPartingPayload[];
}

export interface IFlightDayPartingPayload {
  flight: IFlightPayload;
  dow: number;
  startHour: number;
  endHour: number;
}

export interface IFlightGeoTargetingPayload {
  flight: IFlightPayload;
  code: string;
  domain: string;
  name: string;
}

export interface IFlightSegmentPayload {
  flight: IFlightPayload;
  code: string;
  name: string;
}
