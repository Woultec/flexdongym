import {
  IonPage,
  IonSplitPane,
  IonRouterOutlet
} from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

import Header from "../../components/admincomponents/Layout/header";
import SideNavbar from "../../components/admincomponents/Layout/Navbar";
import Footer from "../../components/admincomponents/Layout/footer";

import Dashboard from "../AdminPage/dashboard";
import Customers from "../AdminPage/customers";
import Employees from "../AdminPage/employees";
import Equipment from "../AdminPage/equipment";
import Products from "../AdminPage/products";
import Profile from "../AdminPage/profile";
import PriceEdit from "../AdminPage/priceedit";

const AdminDashboard: React.FC = () => {
  return (
    <IonPage>
      <IonSplitPane contentId="admin-content">

        <SideNavbar />

        <div style={{ width: "100%" }}>
          
          <Header />

          <IonRouterOutlet id="admin-content">

            <Route exact path="/admin/dashboard" component={Dashboard} />
            <Route exact path="/admin/customers" component={Customers} />
            <Route exact path="/admin/employees" component={Employees} />
            <Route exact path="/admin/equipment" component={Equipment} />
            <Route exact path="/admin/products" component={Products} />
            <Route exact path="/admin/profile" component={Profile} />
            <Route exact path="/admin/priceedit" component={PriceEdit} />

            <Redirect exact from="/admin" to="/admin/dashboard" />

          </IonRouterOutlet>

          <Footer />

        </div>

      </IonSplitPane>
    </IonPage>
  );
};

export default AdminDashboard;
