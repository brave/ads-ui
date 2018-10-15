export interface IInvoiceAction {
  type: string;
  payload: IUpdateInvoicePayload | IInvoicePayload | IInvoicePayload[] | Partial<IInvoicePayload> |null;
}

export interface IUpdateInvoicePayload {
  state: string;
  paid: number;
}

export interface IInvoicePayload {
  id: string;
  state: string;
  startDate: Date;
  endDate: Date;
  paidAt: Date;
  createdAt: string;
  modifiedAt: string;
  confirmationCount: number;
  balance: number;
  paid: number;
}
