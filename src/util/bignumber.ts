import BigNumber from "bignumber.js";

export function toBN(value: string): BigNumber {
  if (!value || value === "") return BigNumber(0);
  try {
    return BigNumber(value);
  } catch {
    return BigNumber(0);
  }
}

export function safeBN(value: BigNumber | number): BigNumber {
  if (typeof value === "number" && isNaN(value)) return BigNumber(0);
  return BigNumber.isBigNumber(value) ? value : BigNumber(value);
}

export const toLocaleString = (b?: BigNumber | number | string) => {
  if (!b) return "0";

  return BigNumber(b).dp(2).toNumber().toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
