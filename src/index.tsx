import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { App } from "App";

import "./index.css";
import "@fontsource/poppins/latin.css";
import "@fontsource/mulish/latin.css";
import { IAuthProvider } from "auth";

ReactDOM.render(
  <IAuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </IAuthProvider>,
  document.getElementById("root") as HTMLElement
);
