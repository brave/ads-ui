import * as React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import { App } from "App";

import "./index.css";
import "@fontsource/poppins/latin.css";
import "@fontsource/mulish/latin.css";
import { IAuthProvider } from "auth";

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <IAuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </IAuthProvider>
  </React.StrictMode>
);
