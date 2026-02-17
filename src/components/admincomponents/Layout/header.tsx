import React from "react";
import { IonHeader, IonToolbar, IonTitle } from "@ionic/react";
import "./header.css";

const Header: React.FC = () => {
  return (
    <IonHeader className="admin-header">
      <IonToolbar color="primary">
        <IonTitle>Admin</IonTitle>
      </IonToolbar>
    </IonHeader>
  );
};

export default Header;
