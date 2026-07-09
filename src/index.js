import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "react-tooltip/dist/react-tooltip.css";
import { HashRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import ScrollToTop from "./components/ScrollToTop";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <HashRouter>
        <ScrollToTop />
        <App />
      </HashRouter>
    </HelmetProvider>
  </React.StrictMode>
);

reportWebVitals();