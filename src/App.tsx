import { IonApp, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";

import Admin from "./pages/Admin";
import Employee from "./pages/Employee";
import StartingPageAdmin from "./pages/Landingpage/StartingPage";
import MenuAdminButtons from "./pages/Landingpage/User_Role";

setupIonicReact();

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        {/* Landing / role selection */}
        <Route exact path="/" component={StartingPageAdmin} />
        <Route exact path="/menu-admin" component={MenuAdminButtons} />

        {/* Main apps by role */}
        <Route path="/admin" component={Admin} />
        <Route path="/employee" component={Employee} />

        {/* Fallback */}
        <Redirect exact from="/home" to="/" />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
