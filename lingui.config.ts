import { LinguiConfig } from "@lingui/conf";

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
  format: "po",
};

export default config;
