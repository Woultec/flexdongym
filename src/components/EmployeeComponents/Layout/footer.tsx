import React from "react";
import { IonFooter, IonToolbar, IonTitle } from "@ionic/react";
import "./footer.css";

const Footer: React.FC = () => {
  return (
    <IonFooter className="employee-footer">
      <IonToolbar>
        <IonTitle size="small">Gym Management System</IonTitle>
      </IonToolbar>
    </IonFooter>
  );
};

export default Footer;
