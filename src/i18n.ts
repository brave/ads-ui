import { detect, fromNavigator } from "@lingui/detect-locale";
import { enUS, esES, ptBR } from "@mui/x-data-grid/locales";

import benefits from "@/assets/images/ad-benefits.svg";
import benefitsEs from "@/assets/images/ad-benefits-es.svg";
import benefitsPt from "@/assets/images/ad-benefits-pt.svg";

const locales = [
  { code: "en", name: "English", gridTheme: enUS, images: { benefits } },
  {
    code: "es",
    name: "Español",
    gridTheme: esES,
    images: { benefits: benefitsEs },
  },
  {
    code: "pt",
    name: "Português",
    gridTheme: ptBR,
    images: { benefits: benefitsPt },
  },
  { code: "test", name: "Pseudolocale", gridTheme: enUS, images: { benefits } },
];

export function findLocale() {
  let locale = "en";
  let gridTheme = enUS;
  let images = { benefits };

  const detectedLocale = detect(fromNavigator());

  if (detectedLocale) {
    const matchedLocale = locales.find((l) =>
      detectedLocale.startsWith(l.code),
    );
    if (matchedLocale) {
      locale = matchedLocale.code;
      gridTheme = matchedLocale.gridTheme;
      images = matchedLocale.images;
    }
  }

  return { locale, gridTheme, images };
}
