import BigNumber from "bignumber.js";
import { MessageDescriptor } from "@lingui/core";

export type Metrics = {
  metric1?: { key: keyof StatsMetric; active: boolean };
  metric2?: { key: keyof StatsMetric; active: boolean };
  metric3?: { key: keyof StatsMetric; active: boolean };
  metric4?: { key: keyof StatsMetric; active: boolean };
};

export type OS = {
  android: number;
  ios: number;
  linux: number;
  macos: number;
  windows: number;
};

export type BaseMetric = {
  views: BigNumber;
  clicks: BigNumber;
  conversions: BigNumber;
  landings: BigNumber;
  spend: BigNumber;
  upvotes: BigNumber;
  downvotes: BigNumber;
  dismissals: BigNumber;
  clickthroughConversion: BigNumber;
  viewthroughConversion: BigNumber;
};

export type StatsMetric = BaseMetric & {
  ctr: BigNumber;
  convRate: BigNumber;
  landingRate: BigNumber;
  dismissRate: BigNumber;
  cpa: BigNumber;
  visitRate: BigNumber;
};

export type Tooltip = {
  suffix?: string;
  prefix?: string;
  decimal?: number;
  format?: string;
};

export interface Option {
  value: string;
  label: MessageDescriptor;
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
