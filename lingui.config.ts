import { LinguiConfig } from "@lingui/conf";
import { formatter } from "@lingui/format-po";

const config: LinguiConfig = {
  locales: ["en", "es", "pt", "test"],
  pseudoLocale: "test",
  sourceLocale: "en",
  fallbackLocales: {
    test: "en",
    default: "en",
  },
  catalogs: [
    {
      path: "<rootDir>/src/locales/{locale}",
      include: ["src"],
    },
  ],
  format: formatter({ lineNumbers: false, origins: false }),
};

export default config;
