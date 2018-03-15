import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import rootReducer from "./reducers";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import "./index.css";

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement,
);
registerServiceWorker();
