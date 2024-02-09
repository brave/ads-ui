import { i18n } from "@lingui/core";

const locales = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "por", name: "Português" },
];

/**
 * We do a dynamic import of just the catalog that we need
 * @param locale any locale string
 */
export async function dynamicActivate(locale: string) {
  const browserLocale = locales.find((l) => locale.includes(l.code));
  const foundLocale = browserLocale ? browserLocale.code : "en";
  const { messages } = await import(`./locales/${foundLocale}/messages.po`);
  i18n.load(locale, messages);
  i18n.activate(locale);
}
