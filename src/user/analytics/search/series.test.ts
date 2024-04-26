import { getMetricDefinition } from "./metrics";
import { makeLineChartSeries } from "./series";
import assert from "node:assert";
import { DeepPartial } from "@apollo/client/utilities";
import dayjs from "dayjs";
import { DailyValuesFragment } from "@/graphql-client/graphql";

it("should populate zero values for missing days in the date range", () => {
  // why? we show a line graph. If there are missing days, the graph will draw the line
  // from the last known value to the next known value, which is misleading - those days
  // should actually be zero.
  //
  // There's an argument to say this should be done on the server, but it's more a function
  // of the fact that we're choosing to display as a line rather than a bar chart, so it's
  // definitely a client-side concern.

  const impressionsMetricDefinition = getMetricDefinition("impression");
  assert.ok(impressionsMetricDefinition);

  const rawValues: DeepPartial<DailyValuesFragment>[] = [
    {
      dimensions: { day: "2021-01-01T00:00:00Z" },
      metrics: { impression: "1" },
    },
    {
      dimensions: { day: "2021-01-03T00:00:00Z" },
      metrics: { impression: "2" },
    },
  ];
  const { data } = makeLineChartSeries(
    impressionsMetricDefinition,
    rawValues as any,
  );

  // this should fill in an entry for 2021-01-02Z with a value of 0
  expect(data).toMatchObject([
    [dayjs("2021-01-01Z").valueOf(), 1],
    [dayjs("2021-01-02Z").valueOf(), 0],
    [dayjs("2021-01-03Z").valueOf(), 2],
  ]);
});

it("should handle empty data", () => {
  // originally I just got this to return no data,
  // but highcharts doesn't bother to draw the graph at all then.
  // It's better to show something.
  const impressionsMetricDefinition = getMetricDefinition("impression");
  assert.ok(impressionsMetricDefinition);

  const { data } = makeLineChartSeries(impressionsMetricDefinition, []);
  expect(data).toMatchObject([[dayjs().utc().startOf("day").valueOf(), 0]]);
});
