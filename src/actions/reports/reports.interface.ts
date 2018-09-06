export interface IReportAction {
  type: string;
  payload: IReportPayload | IReportPayload[] | null;
}

export interface IReportCreatives {
  creativeInstanceId: string;
  creativeId: string;
  confirmationDate: Date;
}

export interface IReportPayload {
  campaignId: string;
  creatives: IReportCreatives[];
}
