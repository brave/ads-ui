import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import registerServiceWorker from "./registerServiceWorker";

import App from "./App";

import configureStore from "./Store";

import "./index.css";

const { persistor, store } = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </PersistGate>
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
