import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "./Header.css";

const Header: React.FC = () => {
  return (
    <IonHeader className="employee-header">
      <IonToolbar color="primary">
        <IonTitle>Employee</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
