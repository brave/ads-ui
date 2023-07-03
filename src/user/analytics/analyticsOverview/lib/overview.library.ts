import _ from "lodash";
import moment from "moment";
import { Options } from "highcharts";
import {
  BaseMetric,
  Metrics,
  StatsMetric,
  Tooltip,
} from "user/analytics/analyticsOverview/types";
import {
  CampaignWithEngagementsFragment,
  EngagementFragment,
} from "graphql/analytics-overview.generated";

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
  processedData: MetricDataSet
) => {
  const metricsEntries = Object.entries(metrics);
  return {
    ...baseOverviewChart,
    series: metricsEntries.map((e, idx) => {
      const attrs = decideValueAttribute(e[1]);
      const dataKey = `${e[0]}DataSet` as keyof MetricDataSet;
      return {
        animation: false,
        name: decideLabel(e[1]),
        yAxis: metricsEntries.length <= 2 ? idx : decideAxis(e[1]),
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

const decideAxis = (metric: string) => {
  switch (metric) {
    case "ctr":
    case "convRate":
    case "landingRate":
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
      return "C.T.R.";
    case "convRate":
      return "Conversion Rate";
    case "landingRate":
      return "Click to 10s Visit Rate";
    case "views":
      return "Impressions";
    case "cpa":
      return "CPA";
    case "visitRate":
      return "10s visit rate";
    case "dismissRate":
      return "Dismissal Rate";
    case "landings":
      return " 10s Visits";
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
  const byType = (type: string, e: EngagementFragment) =>
    e.type === type ? e.count : 0;

  return {
    views: byType("view", engagement),
    conversions: byType("conversion", engagement),
    landings: byType("landed", engagement),
    clicks: byType("click", engagement),
    spend: engagement.cost,
    upvotes: byType("upvote", engagement),
    downvotes: byType("downvote", engagement),
    dismissals: byType("dismiss", engagement),
  };
};

export const reduceMetric = (a: BaseMetric, b: BaseMetric) => {
  return {
    views: a.views + b.views,
    conversions: a.conversions + b.conversions,
    landings: a.landings + b.landings,
    clicks: a.clicks + b.clicks,
    spend: a.spend + b.spend,
    upvotes: a.upvotes + b.upvotes,
    downvotes: a.downvotes + b.downvotes,
    dismissals: a.dismissals + b.dismissals,
  };
};

export const processStats = (
  engagements: EngagementFragment[]
): StatsMetric => {
  if (engagements.length === 0) {
    return {
      clicks: 0,
      convRate: 0,
      conversions: 0,
      cpa: 0,
      ctr: 0,
      dismissRate: 0,
      dismissals: 0,
      downvotes: 0,
      landingRate: 0,
      landings: 0,
      spend: 0,
      upvotes: 0,
      views: 0,
      visitRate: 0,
    };
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
  numerator: number,
  denominator: number
) {
  let metric: number;
  if (isPercent) {
    metric = (numerator / denominator) * 100;
  } else {
    metric = numerator / denominator;
  }

  return metric === Infinity ? 0 : metric;
}

export const processData = (
  engagements: EngagementFragment[],
  metrics: Metrics,
  grouping: string
) => {
  // Group data by user setting
  const groupedData = _.groupBy(engagements, function (engagement) {
    return moment
      .utc(engagement.createdat)
      .startOf(mapGroupingName(grouping))
      .toISOString();
  });

  const { metric1, metric2, metric3, metric4 } = metrics;

  // Create data sets for chart
  let metric1DataSet: number[][] = [];
  let metric2DataSet: number[][] = [];
  let metric3DataSet: number[][] = [];
  let metric4DataSet: number[][] = [];

  for (const key in groupedData) {
    const date = moment(key).valueOf();
    const data = groupedData[key];
    const processed = processStats(data);

    if (metric1) {
      metric1DataSet.push([date, processed[metric1]]);
    }

    if (metric2) {
      metric2DataSet.push([date, processed[metric2]]);
    }

    if (metric3) {
      metric3DataSet.push([date, processed[metric3]]);
    }

    if (metric4) {
      metric4DataSet.push([date, processed[metric4]]);
    }
  }

  return {
    metric1DataSet: _.orderBy(metric1DataSet),
    metric2DataSet: _.orderBy(metric2DataSet),
    metric3DataSet: _.orderBy(metric3DataSet),
    metric4DataSet: _.orderBy(metric4DataSet),
  };
};
