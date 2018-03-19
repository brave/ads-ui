import { applyMiddleware, createStore } from "redux";
import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";

import rootReducer from "./reducers";

const loggerMiddleware = createLogger();

const persistConfig = {
  blacklist: ["form"],
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
  const store = createStore(persistedReducer, applyMiddleware(
    loggerMiddleware,
    thunkMiddleware,
  ));
  const persistor = persistStore(store);
  return { store, persistor };
};
