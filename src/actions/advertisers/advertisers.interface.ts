export interface IAdvertiserAction {
  type: string;
  payload: ICreateAdvertiserPayload | IAdvertiserPayload[] | IAdvertiserPayload | Partial<IAdvertiserPayload> | null;
}

export interface ICreateAdvertiserPayload {
  name: string;
}

export interface IAdvertiserAddressPayload {
  id: string;
  street1: string;
  street2: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

export interface IAdvertiserPayload {
  id: string;
  name: string;
  state: string;
  createdAt: string;
  modifiedAt: string;
  phone: string;
  billingEmail: any[];
  mailingAddress: IAdvertiserAddressPayload;
  billingAddress: IAdvertiserPayload;
}
