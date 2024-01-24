import BigNumber from "bignumber.js";

export const toLocaleString = (b?: BigNumber | number | string) => {
  if (!b) return "0";

  return BigNumber(b).dp(4).toNumber().toLocaleString();
};
