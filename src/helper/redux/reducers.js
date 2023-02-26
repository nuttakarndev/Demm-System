import { authReducer } from "./slice/auth.slice";

const { combineReducers } = require("@reduxjs/toolkit");

export const reducers = combineReducers({
  auth: authReducer,
});

