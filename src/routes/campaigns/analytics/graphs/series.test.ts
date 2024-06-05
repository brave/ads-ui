import { getMetricDefinition } from "../metrics";
import { DataValues, makeLineChartSeries } from "./series";
import assert from "node:assert";
import { DeepPartial } from "@apollo/client/utilities";
import dayjs from "dayjs";

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

  const rawValues: DeepPartial<DataValues>[] = [
    { timestamp: "2021-01-01Z", metrics: { impression: "1" } },
    { timestamp: "2021-01-03Z", metrics: { impression: "2" } },
  ];
  const { data } = makeLineChartSeries(
    impressionsMetricDefinition,
    rawValues as DataValues[],
    "day",
  );

  // this should fill in an entry for 2021-01-02Z with a value of 0
  expect(data).toMatchObject([
    [dayjs("2021-01-01Z").valueOf(), 1],
    [dayjs("2021-01-02Z").valueOf(), 0],
    [dayjs("2021-01-03Z").valueOf(), 2],
  ]);
});

it("should populate zero values for missing hours in the date range", () => {
  const impressionsMetricDefinition = getMetricDefinition("impression");
  assert.ok(impressionsMetricDefinition);

  const rawValues: DeepPartial<DataValues>[] = [
    {
      timestamp: "2024-03-18T20:00:00.000Z",
      metrics: { impression: "1" },
    },
    {
      timestamp: "2024-03-18T23:00:00.000Z",
      metrics: { impression: "2" },
    },
  ];
  const { data } = makeLineChartSeries(
    impressionsMetricDefinition,
    rawValues as DataValues[],
    "hour",
  );

  expect(data).toMatchObject([
    [dayjs("2024-03-18T20:00:00.000Z").valueOf(), 1],
    [dayjs("2024-03-18T21:00:00.000Z").valueOf(), 0],
    [dayjs("2024-03-18T22:00:00.000Z").valueOf(), 0],
    [dayjs("2024-03-18T23:00:00.000Z").valueOf(), 2],
  ]);
});

it("should handle empty data", () => {
  // originally I just got this to return no data,
  // but highcharts doesn't bother to draw the graph at all then.
  // It's better to show something.
  const impressionsMetricDefinition = getMetricDefinition("impression");
  assert.ok(impressionsMetricDefinition);

  const { data } = makeLineChartSeries(impressionsMetricDefinition, [], "day");
  expect(data).toMatchObject([[dayjs().utc().startOf("day").valueOf(), 0]]);
});
