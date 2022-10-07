import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ProductProvider } from "./context/ProductProvider";
import { AuthProvider } from "./context/AuthProvider";

import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { AdminProvider } from "./context/AdminProvider";
import { UserProvider } from "./context/UsersProvider";
import { ReportProvider } from "./context/ReportProvider";
import { StatisticProvider } from "./context/StatisticProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <ProductProvider>
        <AuthProvider>
          <AdminProvider>
            <UserProvider>
              <ReportProvider>
                {/* <StatisticProvider> */}
                <App />
                {/* </StatisticProvider> */}
              </ReportProvider>
            </UserProvider>
          </AdminProvider>
        </AuthProvider>
      </ProductProvider>
    </BrowserRouter>
  </Provider>
);
