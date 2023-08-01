import { useCallback, useEffect, useRef, useState } from "react";
import { Metrics, StatsMetric } from "user/analytics/analyticsOverview/types";
import _ from "lodash";

export function usePersistMetricFilter(
  opts: { campaignId?: string; hasConversions?: boolean } = {},
) {
  const baseFilter: Metrics = {
    metric1: { key: "views", active: true },
    metric2: { key: "clicks", active: false },
    metric3: {
      key: opts.hasConversions ? "conversions" : "dismissals",
      active: false,
    },
    metric4: { key: "landings", active: false },
  };

  const [metrics, setMetrics] = useState<Metrics>();

  useEffect(() => {
    const rawFilter = window.localStorage.getItem("metricFilter");
    if (rawFilter) {
      setMetrics(JSON.parse(rawFilter));
    } else {
      setMetrics(baseFilter);
    }
  }, [opts.hasConversions]);

  const setMetric = useCallback(
    (metric: keyof Metrics, value: keyof StatsMetric, active: boolean) => {
      if (!metrics) {
        return;
      }

      const metricsCopy = _.cloneDeep(metrics);
      const selectedMetric = metricsCopy[metric];

      if (selectedMetric) {
        selectedMetric.key = value;
        selectedMetric.active = active;
      }

      setMetrics({ ...metricsCopy });
      window.localStorage.setItem("metricFilter", JSON.stringify(metricsCopy));
    },
    [metrics],
  );

  return { metrics: metrics!, setMetric };
}
