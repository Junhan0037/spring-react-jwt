import {configureStore} from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import {createLogger} from "redux-logger";

const logger = createLogger();

const store = configureStore({
  reducer: rootReducer,
  middleware: [logger],
  devTools: process.env.NODE_ENV !== 'production',
})

export default store;
