import { createLogger } from "redux-logger";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunkMiddleware from "redux-thunk";
import { reducers } from "./reducers";
const {
  compose,
  applyMiddleware,
  legacy_createStore,
} = require("@reduxjs/toolkit");
const logger = createLogger({
  collapsed: (_, __, logEntry) => !logEntry.error,
});
const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, logger));
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
  getStoreState: false,
  debug: false,
};
const persistedReducer = persistReducer(persistConfig, reducers);
export const store = legacy_createStore(persistedReducer, enhancer);
export const persistor = persistStore(store);
