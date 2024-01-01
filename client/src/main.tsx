import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./reducer/themeReducer.ts";
import { Provider } from "react-redux";
import userReducer from "./reducer/userReducer.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { SkeletonTheme } from "react-loading-skeleton";

const store = configureStore({
  reducer: {
    theme: themeReducer,
    user: userReducer,
  },
});

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <QueryClientProvider client={client}>
          <SkeletonTheme baseColor="#bdbdbd" highlightColor="#f0f0f0">
            <App />
          </SkeletonTheme>
        </QueryClientProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
