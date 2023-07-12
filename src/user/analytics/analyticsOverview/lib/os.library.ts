import { calculateMetric } from "./overview.library";
import { EngagementFragment } from "graphql/analytics-overview.generated";
import { OS, OSMetric } from "../types";

export function processOs(engagements: EngagementFragment[]) {
  let stats: OSMetric = {
    view: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
    conversion: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
    landed: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
    click: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
    spend: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
    dismiss: { android: 0, ios: 0, linux: 0, macos: 0, windows: 0 },
  };

  engagements.forEach((e) => {
    if (e.pricetype === e.type) {
      stats.spend.android += e.price * e.android;
      stats.spend.ios += e.price * e.ios;
      stats.spend.macos += e.price * e.macos;
      stats.spend.linux += e.price * e.linux;
      stats.spend.windows += e.price * e.windows;
    }

    switch (e.type) {
      case "view":
      case "click":
      case "landed":
      case "conversion":
      case "dismiss":
        stats[e.type].android += e.android;
        stats[e.type].ios += e.ios;
        stats[e.type].linux += e.linux;
        stats[e.type].macos += e.macos;
        stats[e.type].windows += e.windows;
        break;
    }
  });

  return stats;
}

export const mapOsStats = (stats: OSMetric) => {
  return {
    ctr: calculateForOS(stats["click"], stats["view"]),
    cpa: calculateForOS(stats["spend"], stats["conversion"], false),
    landingRate: calculateForOS(stats["landed"], stats["click"]),
    visitRate: calculateForOS(stats["landed"], stats["view"]),
    dismissRate: calculateForOS(stats["dismiss"], stats["view"]),
    convRate: calculateForOS(stats["conversion"], stats["click"]),
  };
};

const calculateForOS = (n: OS, d: OS, isPercent: boolean = true) => {
  return {
    android: calculateMetric(isPercent, n.android, d.android),
    ios: calculateMetric(isPercent, n.ios, d.ios),
    windows: calculateMetric(isPercent, n.windows, d.windows),
    linux: calculateMetric(isPercent, n.linux, d.linux),
    macos: calculateMetric(isPercent, n.macos, d.macos),
  };
};

export function mapDevice(entries: [string, number][]) {
  const reduce = (a: [string, number][]) => {
    return a.map((c) => c[1]).reduce((a, b) => a + b);
  };

  const byDesktop = entries.filter(
    (c) => c[0] === "windows" || c[0] === "linux" || c[0] === "macos",
  );
  const byMobile = entries.filter((c) => c[0] === "ios" || c[0] === "android");

  return { desktop: reduce(byDesktop), mobile: reduce(byMobile) };
}
