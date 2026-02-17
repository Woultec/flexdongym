import React from "react";
import { IonPage, IonRouterOutlet } from "@ionic/react";
import { Route, Redirect } from "react-router-dom";

import Header from "../../components/EmployeeComponents/Layout/Header";
import Footer from "../../components/EmployeeComponents/Layout/footer";

import EmployeeDashboard from "../EmployeePage/EmployeeDashboard";
import QRScanner from "../EmployeePage/QRScanner";
import StatusMember from "../EmployeePage/StatusMember";
import MemberProfile from "../EmployeePage/MemberProfile";
import Prepaid from "../EmployeePage/Prepaid";
import WalkIn from "../EmployeePage/WalkIn";
import POS from "../EmployeePage/POS";
import Member from "../EmployeePage/Member";

const EmployeeDashboardLayout: React.FC = () => {
  return (
    <IonPage>
      <Header />

      <IonRouterOutlet>
        {/* Employee routes (recommended) */}
        <Route exact path="/employee/dashboard" component={EmployeeDashboard} />
        <Route exact path="/employee/qr" component={QRScanner} />
        <Route exact path="/employee/status-member" component={StatusMember} />
        <Route exact path="/employee/profile-member" component={MemberProfile} />
        <Route exact path="/employee/prepaid" component={Prepaid} />
        <Route exact path="/employee/walkin" component={WalkIn} />
        <Route exact path="/employee/pos" component={POS} />
        <Route exact path="/employee/member" component={Member} />

        <Redirect exact from="/employee" to="/employee/dashboard" />

        {/* Backward-compatible routes (your existing pages currently navigate to these) */}
        <Route exact path="/qr" component={QRScanner} />
        <Route exact path="/status-member" component={StatusMember} />
        <Route exact path="/profile-member" component={MemberProfile} />
        <Route exact path="/prepaid" component={Prepaid} />
        <Route exact path="/walkin" component={WalkIn} />
        <Route exact path="/pos" component={POS} />
        <Route exact path="/menu" component={EmployeeDashboard} />
      </IonRouterOutlet>

      <Footer />
    </IonPage>
  );
};

export default EmployeeDashboardLayout;
