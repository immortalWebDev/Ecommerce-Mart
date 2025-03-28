import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./bootstrap-custom.scss";
import 'font-awesome/css/font-awesome.min.css';
import { NetworkCheck } from "./pages/pagesExpo";
import MaintenancePage from "./pages/MaintenancePage/MaintenancePage";

const isMaintenanceMode = false

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <NetworkCheck>
      {isMaintenanceMode ? <MaintenancePage/> : <App />}
      </NetworkCheck>
    </BrowserRouter>
  </Provider>
);
