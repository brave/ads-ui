import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "./App";

import "./index.css";
import "@fontsource/poppins/latin.css";
import "@fontsource/mulish/latin.css";

import "./init_dayjs";

import { IAuthProvider } from "@/auth";
import { Environment, getEnvironment } from "@/util/environment";
import { createInstance, MatomoProvider } from "@jonkoops/matomo-tracker-react";
import { VERSION } from "@/util/version";
import { i18n } from "@lingui/core";
import { I18nProvider } from "@lingui/react";
import { useEffect } from "react";
import { findLocale } from "./i18n";

console.log(
  // eslint-disable-next-line lingui/no-unlocalized-strings
  `https://github.com/brave/ads-ui rev ${VERSION.shortHash} built ${VERSION.buildTime}`,
);

const container = document.getElementById("root");
const root = createRoot(container!);
const env = getEnvironment();

const matomoInstance = createInstance({
  urlBase: "https://analytics.brave.com/",
  siteId: env === Environment.PRODUCTION ? 11 : 12,
  disabled: env === Environment.LOCAL,
  heartBeat: {
    active: false,
  },
  linkTracking: false,
});

const languages = import.meta.glob("./locales/*.po", {
  eager: true,
  import: "messages",
});

i18n.load({
  en: languages["./locales/en.po"] as any,
  es: languages["./locales/es.po"] as any,
  pt: languages["./locales/pt.po"] as any,
  test: languages["./locales/test.po"] as any,
});

const LocalizedApp = () => {
  useEffect(() => {
    const locale = findLocale();
    i18n.activate(locale.locale);
  }, []);

  return (
    <I18nProvider i18n={i18n}>
      <App />
    </I18nProvider>
  );
};

root.render(
  <React.StrictMode>
    <MatomoProvider value={matomoInstance}>
      <IAuthProvider>
        <BrowserRouter>
          <LocalizedApp />
        </BrowserRouter>
      </IAuthProvider>
    </MatomoProvider>
  </React.StrictMode>,
);
