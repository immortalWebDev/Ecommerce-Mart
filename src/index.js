import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import App from "./App";
import "./bootstrap-custom.scss";
import { NetworkCheck } from "./pages/pagesExpo";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <NetworkCheck>
        <App />
      </NetworkCheck>
    </BrowserRouter>
  </Provider>
);
