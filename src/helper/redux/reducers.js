import { authReducer } from "./slice/auth.slice";
import { deviceReducer } from "./slice/device.sliec";

const { combineReducers } = require("@reduxjs/toolkit");

export const reducers = combineReducers({
  auth: authReducer,
  device: deviceReducer,
});
