import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import reportWebVitals from "./reportWebVitals";
import { store } from "./store/store";

//axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:4001/api/v1";
/*axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true;
axios.defaults.headers.common["Access-Control-Allow-Origin"] =
  "http://localhost:3000";*/

//axios.defaults.baseURL = "https://pruebasrepositorios.azurewebsites.net/api/v1";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
