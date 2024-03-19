import { vi } from "vitest";
import { isNowAfterDate, isNowBeforeDate } from "./isAfterEndDate";

it("should correctly calculate if a date is after the end date", () => {
  vi.setSystemTime("2023-02-01Z");

  expect(isNowAfterDate("2022-01-01Z")).toBe(true);
  expect(isNowAfterDate("2023-01-01Z")).toBe(true);
  expect(isNowAfterDate("2024-01-01Z")).toBe(false);
});

it("should correctly calculate if a date is before the start date", () => {
  vi.setSystemTime("2023-02-01Z");

  expect(isNowBeforeDate("2022-01-01Z")).toBe(false);
  expect(isNowBeforeDate("2023-01-01Z")).toBe(false);
  expect(isNowBeforeDate("2024-01-01Z")).toBe(true);
});
