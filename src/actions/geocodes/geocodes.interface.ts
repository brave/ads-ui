export interface IGeocodeAction {
  type: string;
  payload: IGeocodePayload | IGeocodePayload[] | null;
}

export interface IGeocodePayload {
  code: string;
  domain: string;
  name: string;
}
