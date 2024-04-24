import _ from "lodash";
import Highcharts, { Options } from "highcharts";
import {
  BaseMetric,
  Metrics,
  StatsMetric,
  Tooltip,
} from "@/user/analytics/analyticsOverview/types";
import { EngagementFragment } from "@/graphql/analytics-overview.generated";
import BigNumber from "bignumber.js";
import { t } from "@lingui/macro";
import dayjs from "dayjs";

type MetricDataSet = {
  metric1DataSet: number[][];
  metric2DataSet: number[][];
  metric3DataSet: number[][];
  metric4DataSet: number[][];
};

export const baseOverviewChart: Options = {
  chart: {
    type: "spline",
    height: "300",
    spacingTop: 40,
    spacingBottom: 10,
    spacingRight: 0,
    spacingLeft: 0,
    zooming: {
      type: "x",
    },
  },
  title: {
    text: undefined,
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    type: "datetime",
  },
  yAxis: [
    {
      opposite: false,
      title: {
        text: undefined,
      },
      tickAmount: 3,
    },
    {
      opposite: true,
      title: {
        text: undefined,
      },
      tickAmount: 3,
    },
  ],
  legend: {
    enabled: false,
  },
  tooltip: {
    shared: true,
  },
  plotOptions: {
    spline: {
      connectNulls: true,
      marker: {
        symbol: "circle",
        radius: 4,
      },
    },
    series: {
      animation: false,
    },
  },
};

export const prepareChart = (
  metrics: Metrics,
  processedData: MetricDataSet,
): Highcharts.Options => {
  const metricsEntries = Object.entries(metrics);
  return {
    ...baseOverviewChart,
    series: metricsEntries
      .filter((m) => m[1].active)
      .map((e, idx) => {
        const attrs = decideValueAttribute(e[1].key);
        // eslint-disable-next-line lingui/no-unlocalized-strings
        const dataKey = `${e[0]}DataSet` as keyof MetricDataSet;
        return {
          animation: false,
          name: decideLabel(e[1].key),
          yAxis: metricsEntries.length <= 2 ? idx : decideAxis(e[1].key),
          data: processedData[dataKey],
          connectNulls: true,
          tooltip: {
            valueDecimals: attrs.decimal,
            valuePrefix: attrs.prefix,
            valueSuffix: attrs.suffix,
          },
          type: "spline",
        };
      }),
  };
};

const decideAxis = (metric: keyof StatsMetric) => {
  switch (metric) {
    case "ctr":
    case "convRate":
    case "landingRate":
    case "dismissRate":
    case "visitRate":
      return 1;
    default:
      return 0;
  }
};

export const decideValueAttribute = (metric: string) => {
  let attr: Tooltip = {
    suffix: undefined,
    prefix: undefined,
    decimal: undefined,
    format: "{point.y:,.0f}",
  };

  switch (metric) {
    case "ctr":
    case "convRate":
    case "landingRate":
    case "dismissRate":
    case "visitRate":
      attr = { ...attr, suffix: "%", decimal: 2, format: "{point.y:,.2f}%" };
      break;
    case "spend":
    case "cpa":
      attr = { ...attr, prefix: "$", decimal: 2, format: "${point.y:,.2f}" };
  }

  return attr;
};

export const decideLabel = (metric: string) => {
  switch (metric) {
    case "ctr":
      return "CTR";
    case "convRate":
      return t`Conversion rate`;
    case "landingRate":
      return t`Click to site visit rate`;
    case "views":
      return t`Impressions`;
    case "cpa":
      return t`CPA`;
    case "visitRate":
      return t`Site visit rate`;
    case "dismissRate":
      return t`Dismissal rate`;
    case "landings":
      return t`Site visits`;
    case "clicks":
      return t`Clicks`;
    case "conversions":
      return t`Conversions`;
    case "spend":
      return t`Spend`;
    case "upvotes":
      return t`Upvotes`;
    case "downvotes":
      return t`Downvotes`;
    case "dismissals":
      return t`Dismissals`;
    case "clickthroughConversion":
      return t`Click-through conversions`;
    case "viewthroughConversion":
      return t`View-through conversions`;
    default:
      return _.capitalize(metric);
  }
};

const mapGroupingName = (grouping: string) => {
  switch (grouping) {
    case "hourly":
      return "hour";
    case "weekly":
      return "week";
    case "monthly":
      return "month";
    default:
      return "day";
  }
};

export const mapMetric = (engagement: EngagementFragment): BaseMetric => {
  return {
    views: BigNumber(engagement.view),
    conversions: BigNumber(engagement.conversion),
    landings: BigNumber(engagement.landed),
    clicks: BigNumber(engagement.click),
    spend: BigNumber(engagement.spend),
    upvotes: BigNumber(engagement.upvote),
    downvotes: BigNumber(engagement.downvote),
    dismissals: BigNumber(engagement.dismiss),
    clickthroughConversion: BigNumber(engagement.clickthroughConversion),
    viewthroughConversion: BigNumber(engagement.viewthroughConversion),
  };
};

export const reduceMetric = (a: BaseMetric, b: BaseMetric) => {
  return {
    views: a.views.plus(b.views),
    conversions: a.conversions.plus(b.conversions),
    landings: a.landings.plus(b.landings),
    clicks: a.clicks.plus(b.clicks),
    spend: a.spend.plus(b.spend),
    upvotes: a.upvotes.plus(b.upvotes),
    downvotes: a.downvotes.plus(b.downvotes),
    dismissals: a.dismissals.plus(b.dismissals),
    clickthroughConversion: a.clickthroughConversion.plus(
      b.clickthroughConversion,
    ),
    viewthroughConversion: a.viewthroughConversion.plus(
      b.viewthroughConversion,
    ),
  };
};

export const processStats = (
  engagements: EngagementFragment[],
): StatsMetric | null => {
  if (engagements.length === 0) {
    return null;
  }

  const reduced = engagements.map(mapMetric).reduce(reduceMetric);

  return {
    ...reduced,
    ctr: calculateMetric(true, reduced.clicks, reduced.views),
    convRate: calculateMetric(true, reduced.conversions, reduced.clicks),
    landingRate: calculateMetric(true, reduced.landings, reduced.clicks),
    cpa: calculateMetric(false, reduced.spend, reduced.conversions),
    dismissRate: calculateMetric(true, reduced.dismissals, reduced.views),
    visitRate: calculateMetric(true, reduced.landings, reduced.views),
  };
};

export function calculateMetric(
  isPercent: boolean,
  numerator: BigNumber | number,
  denominator: BigNumber | number,
) {
  let metric = BigNumber(numerator).dividedBy(denominator);
  if (isPercent) {
    metric = metric.multipliedBy(100);
  }

  return !metric.isFinite() ? BigNumber(0) : metric.dp(3);
}

export const processData = (
  engagements: EngagementFragment[],
  metrics: Metrics,
  grouping: string,
) => {
  // Group data by user setting
  const groupedData = _.groupBy(engagements, function (engagement) {
    return dayjs
      .utc(engagement.createdat)
      .startOf(mapGroupingName(grouping))
      .toISOString();
  });

  const { metric1, metric2, metric3, metric4 } = metrics;

  // Create data sets for chart
  const metric1DataSet: number[][] = [];
  const metric2DataSet: number[][] = [];
  const metric3DataSet: number[][] = [];
  const metric4DataSet: number[][] = [];

  for (const key in groupedData) {
    const date = dayjs(key).valueOf();
    const data = groupedData[key];
    const processed = processStats(data);
    if (!processed) {
      continue;
    }

    if (metric1) {
      metric1DataSet.push([date, processed[metric1.key].toNumber()]);
    }

    if (metric2) {
      metric2DataSet.push([date, processed[metric2.key].toNumber()]);
    }

    if (metric3) {
      metric3DataSet.push([date, processed[metric3.key].toNumber()]);
    }

    if (metric4) {
      metric4DataSet.push([date, processed[metric4.key].toNumber()]);
    }
  }

  return {
    metric1DataSet: _.orderBy(metric1DataSet),
    metric2DataSet: _.orderBy(metric2DataSet),
    metric3DataSet: _.orderBy(metric3DataSet),
    metric4DataSet: _.orderBy(metric4DataSet),
  };
};
