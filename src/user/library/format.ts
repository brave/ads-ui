import BigNumber from "bignumber.js";

const percentageFormatter = new Intl.NumberFormat(undefined, {
  maximumSignificantDigits: 3,
  style: "percent",
});

const numberFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 0,
});

const usdFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
});

const usdDollarsOnlyFormatter = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "USD",
  currencyDisplay: "narrowSymbol",
  maximumFractionDigits: 0,
});

// use this function when you have a rate (such as 0.12) that you want to format as
// a percentage (12%)
export function formatRateAsPercent(value: BigNumber | number): string {
  return percentageFormatter.format(BigNumber(value).toNumber());
}

// use this function when you have a value that's already a percentage (such as 12)
// that you want to format as a percentage (12%)
export function formatPercentAsPercent(value: BigNumber | number): string {
  return formatRateAsPercent(BigNumber(value).dividedBy(100));
}

export function formatWholeNumber(value: BigNumber | number): string {
  return numberFormatter.format(BigNumber(value).toNumber());
}

export function formatUsd(
  value: BigNumber | number,
  options: { dollarsOnly?: boolean } = { dollarsOnly: false },
): string {
  const formatter = options.dollarsOnly
    ? usdDollarsOnlyFormatter
    : usdFormatter;
  return formatter.format(BigNumber(value).toNumber());
}

export function format(
  type: "number" | "rate" | "usd",
  value: BigNumber | number,
): string {
  switch (type) {
    case "number":
      return formatWholeNumber(value);
    case "rate":
      return formatRateAsPercent(value);
    case "usd":
      return formatUsd(value);
  }
}
