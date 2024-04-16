import { detect, fromUrl } from "@lingui/detect-locale";
import { enUS, esES, ptBR } from "@mui/x-data-grid/locales";

const locales = [
  { code: "en", name: "English", gridTheme: enUS },
  { code: "es", name: "Español", gridTheme: esES },
  { code: "pt", name: "Português", gridTheme: ptBR },
  { code: "test", name: "Pseudolocale", gridTheme: enUS },
];

export function findLocale() {
  let locale = "en";
  let gridTheme = enUS;

  const detectedLocale = detect(fromUrl("lang") /*fromNavigator(), */);

  if (detectedLocale) {
    const matchedLocale = locales.find((l) =>
      detectedLocale.startsWith(l.code),
    );
    if (matchedLocale) {
      locale = matchedLocale.code;
      gridTheme = matchedLocale.gridTheme;
    }
  }

  return { locale, gridTheme };
}
