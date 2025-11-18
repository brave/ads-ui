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

console.log(
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

root.render(
  <React.StrictMode>
    <MatomoProvider value={matomoInstance}>
      <IAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IAuthProvider>
    </MatomoProvider>
  </React.StrictMode>,
);
