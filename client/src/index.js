import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import {Provider} from "react-redux";
import configureAppStore from "./store/store";
import {BrowserRouter} from "react-router-dom";
import {App} from "./App";
import {Toast} from "./components/toast/toast";

const store = configureAppStore()

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
      <Toast/>
      <BrowserRouter>
          <App/>
      </BrowserRouter>
  </Provider>
);