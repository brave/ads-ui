import { i18n } from "@lingui/core";
import { detect, fromUrl } from "@lingui/detect-locale";

const locales = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "pt", name: "Português" },
  { code: "test", name: "Pseudolocale" },
];

export async function dynamicActivate() {
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

  console.log(`detected locale "${detectedLocale}" using locale "${locale}"`);
  const { messages } = await import(`./locales/${locale}.po`);
  i18n.loadAndActivate({ locale: locale, messages });
}
