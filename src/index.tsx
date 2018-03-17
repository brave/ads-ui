import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import "./index.css";

const loggerMiddleware = createLogger();

const store = createStore(rootReducer,
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
  ));

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
