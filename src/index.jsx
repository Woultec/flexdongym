import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Capacitor } from "@capacitor/core";
import "./index.css";

// Detect if running inside a Capacitor app
const isMobile = Capacitor.isNativePlatform(); // true for Android/iOS, false for web
const Router = isMobile ? HashRouter : BrowserRouter;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Router>
    <App />
  </Router>,
);
