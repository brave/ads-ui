import { MetricDefinition, getMetricDefinition } from "./metrics";
import _ from "lodash";
import { useHistory } from "react-router-dom";
import {
  BREAKDOWNS,
  getBreakdownDefinition,
  LocalizedBreakdown,
} from "./breakdowns";
import { Dispatch, DispatchWithoutAction, useEffect, useState } from "react";
import {
  buildTimeFilters,
  getTimeFilter,
  TimeFilterEntry,
} from "@/routes/campaigns/analytics/filters/time-filters";
import {
  getOsFilter,
  LocalizedOsFilterEntry,
} from "@/routes/campaigns/analytics/filters/OsFilter";
import { useStickyState } from "@/hooks/useStickyState";
import { PerformanceFilter } from "@/graphql-client/graphql";
import { CampaignOverviewProps } from "@/util/CampaignIdProps";

// it's nicest to use , to separate metrics, but that gets URL encoded.
// but "space" gets encoded as "+", which is ok
const SEPARATOR = " ";

interface UseMetricSelectionResult {
  toggleMetric: (metric: MetricDefinition) => void;
  isSelected: (metric: MetricDefinition) => boolean;
  forceDefaultSelection: () => void;
  selectedMetrics: readonly MetricDefinition[];
}

export function useMetricSelection(): UseMetricSelectionResult {
  return getGenericMultiSelect(
    "metrics",
    getMetricDefinition,
    "impression ctr",
  );
}

interface UseOsSelectionResult {
  toggleMetric: (metric: LocalizedOsFilterEntry) => void;
  isSelected: (metric: LocalizedOsFilterEntry) => boolean;
  forceDefaultSelection: (reset?: boolean) => void;
  selectedMetrics: readonly LocalizedOsFilterEntry[];
  removeMetric: (id: string) => void;
}

export function useOsFilterParams(): UseOsSelectionResult {
  return getGenericMultiSelect("os", getOsFilter, "all");
}

function getGenericMultiSelect<T extends { id: string }>(
  urlParam: string,
  selectedFunc: (id: string) => T | undefined,
  defaultSelection: string,
) {
  const {
    location: { search },
    replace,
  } = useHistory();

  const [filter, setFilter] = useStickyState(urlParam, defaultSelection);
  const params = new URLSearchParams(search);
  const paramIds = params.get(urlParam)?.split(SEPARATOR) ?? [];
  const paramSet = new Set(_.compact(paramIds));
  const paramArray = _.compact(Array.from(paramSet).map(selectedFunc));

  return {
    forceDefaultSelection: (reset: boolean = false) => {
      if (paramSet.size === 0 || reset) {
        params.set(urlParam, filter);
        replace({
          search: params.toString(),
        });
      }
    },
    removeMetric: (id: string) => paramSet.delete(id),
    isSelected: (metric: T) => paramSet.has(metric.id),
    toggleMetric: (metric: T) => {
      const newMetrics = new Set(paramSet);
      if (newMetrics.has(metric.id)) {
        newMetrics.delete(metric.id);
      } else {
        newMetrics.add(metric.id);
      }

      let newParams = Array.from(newMetrics).join(SEPARATOR);
      if (newMetrics.size === 0) {
        newParams = defaultSelection;
      }

      params.set(urlParam, newParams);
      setFilter(newParams);
      replace({
        search: params.toString(),
      });
    },
    selectedMetrics: paramArray,
  };
}

interface UseBreakdownParamsResult {
  selected: LocalizedBreakdown | undefined;
  setSelected: Dispatch<LocalizedBreakdown>;
  forceDefaultBreakdownSelection: DispatchWithoutAction;
}

export function useBreakdownParams(): UseBreakdownParamsResult {
  return getGenericFilterParams(
    "show",
    getBreakdownDefinition,
    BREAKDOWNS[0].id,
  );
}

interface UseTimeParamsResult {
  selected: TimeFilterEntry | undefined;
  setSelected: Dispatch<TimeFilterEntry>;
  forceDefaultBreakdownSelection: DispatchWithoutAction;
}

export function useTimeFilterParams(): UseTimeParamsResult {
  return getGenericFilterParams(
    "time",
    getTimeFilter,
    buildTimeFilters()[0].id,
  );
}

function getGenericFilterParams<T extends { id: string }>(
  urlParam: string,
  selectedFunc: (id: string | undefined | null) => T | undefined,
  defaultSelection: string,
) {
  const {
    location: { search },
    replace,
  } = useHistory();

  const [filter, setFilter] = useStickyState(urlParam, defaultSelection);
  const params = new URLSearchParams(search);
  const param = params.get(urlParam);
  const selected = selectedFunc(param);

  return {
    forceDefaultBreakdownSelection: () => {
      if (!selected) {
        setTimeout(() => {
          params.set(urlParam, filter);
          replace({
            search: params.toString(),
          });
        });
      }
    },
    selected,
    setSelected: (filter: T) => {
      params.set(urlParam, filter.id);
      setFilter(filter.id);
      replace({
        search: params.toString(),
      });
    },
  };
}

export function useCampaignAnalyticFilter({
  campaignOverview,
}: CampaignOverviewProps) {
  const { selected } = useTimeFilterParams();
  const { selectedMetrics: os } = useOsFilterParams();

  const [filter, setFilter] = useState<PerformanceFilter>({
    campaignIds: [campaignOverview.id],
  });

  useEffect(() => {
    setFilter((prevFilter) => ({
      ...prevFilter,
      from: selected?.from?.toISOString(),
      to: selected?.to?.toISOString(),
      os:
        os.length === 0 || (os.length === 1 && os[0].id === "all")
          ? undefined
          : os.map((a) => a.id),
    }));
  }, [JSON.stringify(selected), JSON.stringify(os)]);

  return { filter, setFilter };
}
