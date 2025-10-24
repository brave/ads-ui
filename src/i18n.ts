import { enUS } from "@mui/x-data-grid/locales";

import benefits from "@/assets/images/ad-benefits.svg";

export function findLocale() {
  const locale = "en";
  const gridTheme = enUS;
  const images = { benefits };

  return { locale, gridTheme, images };
}
