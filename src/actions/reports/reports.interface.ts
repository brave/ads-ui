export interface IReportAction {
  type: string;
  payload: IReportPayload | IReportPayload[] | null;
}

export interface IReportConfirmations {
  creativeInstanceId: string;
  creativeId: string;
  confirmationDate: Date;
  confirmationType: string;
}

export interface IReportPayload {
  campaignId: string;
  confirmations: IReportConfirmations[];
}
