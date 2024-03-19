import { vi } from "vitest";
import { isDateInThePast, isDateInTheFuture } from "./isAfterEndDate";

it("should correctly calculate if a date is after the end date", () => {
  vi.setSystemTime("2023-02-01Z");

  expect(isDateInThePast("2022-01-01Z")).toBe(true);
  expect(isDateInThePast("2023-01-01Z")).toBe(true);
  expect(isDateInThePast("2024-01-01Z")).toBe(false);
});

it("should correctly calculate if a date is before the start date", () => {
  vi.setSystemTime("2023-02-01Z");

  expect(isDateInTheFuture("2022-01-01Z")).toBe(false);
  expect(isDateInTheFuture("2023-01-01Z")).toBe(false);
  expect(isDateInTheFuture("2024-01-01Z")).toBe(true);
});
