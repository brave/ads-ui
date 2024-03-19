import { detect, fromUrl } from "@lingui/detect-locale";

const locales = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "test", name: "Pseudolocale" },
];

export function findLocale() {
  let locale = "en";

  const detectedLocale = detect(fromUrl("lang") /*fromNavigator(), */);

  if (detectedLocale) {
    const matchedLocale = locales.find((l) =>
      detectedLocale.startsWith(l.code),
    );
    if (matchedLocale) {
      locale = matchedLocale.code;
    }
  }

  return locale;
}
