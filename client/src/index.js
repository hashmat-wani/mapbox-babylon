import { store } from "./state/store";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import LoadingContext from "./context/LoadingContext";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <LoadingContext>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </LoadingContext>
  </Provider>
);
