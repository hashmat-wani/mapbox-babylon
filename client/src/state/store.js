import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import resetPwdReducer from "./resetPwdSlice";
import pinsReducer from "./pinsSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    pins: pinsReducer,
    resetPwdReducer,
  },
});
