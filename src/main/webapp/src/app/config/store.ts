import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import logger from "redux-logger";

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }).concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
})
