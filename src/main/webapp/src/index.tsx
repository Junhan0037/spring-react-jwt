import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistStore} from "redux-persist";
import store from './app/config/store';
import { axiosInterceptorSetup } from './app/config/axios-interceptor';

axiosInterceptorSetup(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
    <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
