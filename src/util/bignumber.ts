import BigNumber from "bignumber.js";

export const toLocaleString = (b?: BigNumber | number | string) => {
  if (!b) return "0";

  return BigNumber(b).dp(2).toNumber().toLocaleString("en", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });
};
