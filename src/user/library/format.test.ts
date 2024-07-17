import BigNumber from "bignumber.js";
import {
  formatWholeNumber,
  formatPercentAsPercent,
  formatRateAsPercent,
  formatUsd,
} from "./format";

// NB: the expected results here assume running on an en locale!
//  In actual browser use we use the locale of the browser to format.
it("should format a rate as a percentage", () => {
  expect(formatRateAsPercent(0.123456)).toBe("12.3%");
  expect(formatRateAsPercent(123.456)).toBe("12,300%");
  expect(formatRateAsPercent(BigNumber(0.123456))).toBe("12.3%");
  expect(formatRateAsPercent(BigNumber(123.456))).toBe("12,300%");
});

it("should format a percent as a percentage", () => {
  expect(formatPercentAsPercent(12.3456)).toBe("12.3%");
  expect(formatPercentAsPercent(12345.6)).toBe("12,300%");
  expect(formatPercentAsPercent(BigNumber(12.3456))).toBe("12.3%");
  expect(formatPercentAsPercent(BigNumber(12345.6))).toBe("12,300%");
});

it("should format a whole number correctly", () => {
  expect(formatWholeNumber(0.123456)).toBe("0");
  expect(formatWholeNumber(123.456)).toBe("123");
  expect(formatWholeNumber(123456)).toBe("123,456");
  expect(formatWholeNumber(-123456)).toBe("-123,456");
  expect(formatWholeNumber(BigNumber(0.123456))).toBe("0");
  expect(formatWholeNumber(BigNumber(123.456))).toBe("123");
  expect(formatWholeNumber(BigNumber(123.556))).toBe("124");
});

it("should format USD values correctly", () => {
  expect(formatUsd(0.123456)).toBe("$0.12");
  expect(formatUsd(123.456)).toBe("$123.46");
  expect(formatUsd(123456)).toBe("$123,456.00");
  expect(formatUsd(-123456)).toBe("-$123,456.00");
  expect(formatUsd(BigNumber(0.123456))).toBe("$0.12");
  expect(formatUsd(BigNumber(123.456))).toBe("$123.46");
  expect(formatUsd(BigNumber(123.556))).toBe("$123.56");
});

it("should format USD values correctly (dollars only)", () => {
  expect(formatUsd(0.123456, { dollarsOnly: true })).toBe("$0");
  expect(formatUsd(123.456, { dollarsOnly: true })).toBe("$123");
  expect(formatUsd(123456, { dollarsOnly: true })).toBe("$123,456");
  expect(formatUsd(-123456, { dollarsOnly: true })).toBe("-$123,456");
  expect(formatUsd(BigNumber(0.123456), { dollarsOnly: true })).toBe("$0");
  expect(formatUsd(BigNumber(123.456), { dollarsOnly: true })).toBe("$123");
  expect(formatUsd(BigNumber(123.556), { dollarsOnly: true })).toBe("$124");
});
