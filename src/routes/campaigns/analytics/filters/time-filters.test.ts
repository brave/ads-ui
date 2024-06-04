import dayjs from "dayjs";
import { buildTimeFilters } from "./time-filters";

it("should return the last few months if no min or max provided", () => {
  expect(buildTimeFilters(dayjs("2024-02-12Z"))).toMatchInlineSnapshot(`
    [
      {
        "divider": true,
        "from": undefined,
        "id": "all-time",
        "label": "All time",
        "to": undefined,
      },
      {
        "from": "2024-02-01T00:00:00.000Z",
        "id": "2024-02",
        "label": "February 2024",
        "to": "2024-02-29T23:59:59.999Z",
      },
      {
        "from": "2024-01-01T00:00:00.000Z",
        "id": "2024-01",
        "label": "January 2024",
        "to": "2024-01-31T23:59:59.999Z",
      },
      {
        "from": "2023-12-01T00:00:00.000Z",
        "id": "2023-12",
        "label": "December 2023",
        "to": "2023-12-31T23:59:59.999Z",
      },
      {
        "from": "2023-11-01T00:00:00.000Z",
        "id": "2023-11",
        "label": "November 2023",
        "to": "2023-11-30T23:59:59.999Z",
      },
    ]
  `);
});

it("should return the months between max and min if provided", () => {
  expect(
    buildTimeFilters(
      dayjs("2024-02-12Z").utc(),
      dayjs("2023-08-01Z").utc(),
      dayjs("2024-05-01Z").utc(),
    ).map((f) => f.label),
  ).toEqual([
    "All time",
    "February 2024",
    "January 2024",
    "December 2023",
    "November 2023",
    "October 2023",
    "September 2023",
    "August 2023",

    // but not the future months!
  ]);
});
