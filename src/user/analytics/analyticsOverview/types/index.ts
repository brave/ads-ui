export type Metrics = {
  metric1?: keyof StatsMetric;
  metric2?: keyof StatsMetric;
  metric3?: keyof StatsMetric;
  metric4?: keyof StatsMetric;
};

export type OS = {
  android: number;
  ios: number;
  linux: number;
  macos: number;
  windows: number;
};

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
  format?: string;
};

export type CreativeMetric = StatsMetric & {
  creativePayload: { title: string; body: string };
};

export type EngagementChartType = "campaign" | "creative" | "creativeset";

export interface Option {
  value: string;
  label: string;
}

export interface OverviewDetail {
  id: string;
  name?: null | string;
  state: string;
}

export interface OSMetric {
  view: OS;
  conversion: OS;
  landed: OS;
  click: OS;
  dismiss: OS;
  spend: OS;
}

export interface CalculatedOSMetric {
  ctr: OS;
  cpa: OS;
  landingRate: OS;
  visitRate: OS;
  dismissRate: OS;
  convRate: OS;
}
