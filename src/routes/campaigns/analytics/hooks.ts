import { MetricDefinition, getMetricDefinition } from "./metrics";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import {
  BREAKDOWNS,
  getBreakdownDefinition,
  LocalizedBreakdown,
} from "./breakdowns";
import { Dispatch, DispatchWithoutAction } from "react";

// it's nicest to use , to separate metrics, but that gets URL encoded.
// but "space" gets encoded as "+", which is ok
const SEPARATOR = " ";

interface UseMetricSelectionResult {
  toggleMetric: (metric: MetricDefinition) => () => void;
  isSelected: (metric: MetricDefinition) => boolean;
  forceDefaultMetricSelection: () => void;
  selectedMetrics: readonly MetricDefinition[];
}

export function useMetricSelection(): UseMetricSelectionResult {
  const {
    location: { search },
    replace,
  } = useHistory();

  const params = new URLSearchParams(search);
  const metricIds = params.get("metrics")?.split(SEPARATOR) ?? [];
  const metricArray = _.compact(metricIds.map(getMetricDefinition));
  const metricSet = new Set(metricArray);

  return {
    forceDefaultMetricSelection: () => {
      if (metricSet.size === 0) {
        // eslint-disable-next-line lingui/no-unlocalized-strings
        params.set("metrics", "impression ctr");
        replace({
          search: params.toString(),
        });
      }
    },
    isSelected: (metric) => metricSet.has(metric),
    toggleMetric: (metric) => () => {
      const newMetrics = new Set(metricSet);
      if (newMetrics.has(metric)) {
        newMetrics.delete(metric);
      } else {
        newMetrics.add(metric);
      }

      params.set(
        "metrics",
        Array.from(newMetrics)
          .map((m) => m.id)
          .join(SEPARATOR),
      );

      replace({
        search: params.toString(),
      });
    },
    selectedMetrics: metricArray,
  };
}

interface UseBreakdownParamsResult {
  selected: LocalizedBreakdown | undefined;
  setSelected: Dispatch<LocalizedBreakdown>;
  forceDefaultBreakdownSelection: DispatchWithoutAction;
}

export function useBreakdownParams(): UseBreakdownParamsResult {
  const {
    location: { search },
    replace,
  } = useHistory();

  const params = new URLSearchParams(search);
  const breakdownId = params.get("show");
  const selected = getBreakdownDefinition(breakdownId);

  return {
    forceDefaultBreakdownSelection: () => {
      if (!selected) {
        setTimeout(() => {
          params.set("show", BREAKDOWNS[0].id);
          replace(
            {
              search: params.toString(),
            },
            0,
          );
        });
      }
    },
    selected,
    setSelected: (breakdown) => {
      params.set("show", breakdown.id);
      replace({
        search: params.toString(),
      });
    },
  };
}
