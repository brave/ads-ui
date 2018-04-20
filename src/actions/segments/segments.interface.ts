export interface ISegmentAction {
  type: string;
  payload: ISegmentPayload | ISegmentPayload[] | null;
}

export interface ISegmentPayload {
  code: string;
  name: string;
}
