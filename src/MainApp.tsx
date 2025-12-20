import React from "react";
import { IonApp, IonRouterOutlet, IonSplitPane } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import Menu from "./components/Menu";
import Page from "./pages/Page";
import App from "./App";           // QR Generator

const MainApp: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonSplitPane contentId="main">
        <Menu />
        <IonRouterOutlet id="main">
          <Switch>
            {/* Default redirect */}
            <Route exact path="/" render={() => <Redirect to="/folder/Inbox" />} />
            {/* Page route */}
            <Route exact path="/folder/:name" component={Page} />
            {/* QR Generator */}
            <Route exact path="/generator" component={App} />
          </Switch>
        </IonRouterOutlet>
      </IonSplitPane>
    </IonReactRouter>
  </IonApp>
);

export default MainApp;