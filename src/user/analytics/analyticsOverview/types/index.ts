export type Metrics = {
  metric1?: string;
  metric2?: string;
  metric3?: string;
  metric4?: string;
};

export type OS = {
  android: number;
  ios: number;
  linux: number;
  macos: number;
  windows: number;
  cost?: number;
};

export type CalculatedMetric = "cpa" | "landed" | "ctr";

export type BaseMetric = {
  views: number;
  clicks: number;
  conversions: number;
  landings: number;
  spend: number;
  upvotes: number;
  downvotes: number;
  dismissals: number;
};

export type StatsMetric = BaseMetric & {
  ctr: number;
  convRate: number;
  landingRate: number;
  dismissRate: number;
  cpa: number;
  visitRate: number;
};

export type Tooltip = {
  suffix?: string;
  prefix?: string;
  decimal?: number;
};

export type CreativeMetric = StatsMetric & {
  creativePayload: { title: string; body: string };
};
