import React from "react";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Capacitor } from "@capacitor/core";

const PlatformAwareRouter = ({ children }) => {
  const platform = Capacitor.getPlatform();
  // Use HashRouter for Android/iOS (Capacitor), BrowserRouter for web
  const Router = platform === "android" || platform === "ios" ? HashRouter : BrowserRouter;

  return <Router>{children}</Router>;
};

export default PlatformAwareRouter;