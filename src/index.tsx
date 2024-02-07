import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "App";

import "./index.css";
import "@fontsource/poppins/latin.css";
import "@fontsource/mulish/latin.css";
import { IAuthProvider } from "auth";
import { Environment, getEnvironment } from "util/environment";
import { createInstance, MatomoProvider } from "@jonkoops/matomo-tracker-react";

const container = document.getElementById("root");
const root = createRoot(container!);

const instance = createInstance({
  urlBase: "https://analytics.brave.com/",
  siteId: getEnvironment() === Environment.PRODUCTION ? 11 : 12,
  heartBeat: {
    active: false,
  },
  linkTracking: false,
});

root.render(
  <React.StrictMode>
    <MatomoProvider value={instance}>
      <IAuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </IAuthProvider>
    </MatomoProvider>
  </React.StrictMode>,
);
