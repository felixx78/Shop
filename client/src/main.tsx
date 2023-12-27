import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/themeReducer.ts";
import { Provider } from "react-redux";
import userReducer from "./reducer/userReducer.ts";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
