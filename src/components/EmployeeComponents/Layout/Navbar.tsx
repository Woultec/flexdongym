import React from "react";
import { IonFooter, IonToolbar, IonButtons, IonButton, IonIcon } from "@ionic/react";
import { qrCodeOutline, cardOutline, personOutline } from "ionicons/icons";
import "./Navbar.css";

/**
 * Minimal responsive footer nav for employee.
 * (You can replace with tabs later; this just ensures the file is a valid module.)
 */
const Navbar: React.FC = () => {
  return (
    <IonFooter>
      <IonToolbar>
        <IonButtons slot="start">
          <IonButton routerLink="/employee/qr">
            <IonIcon icon={qrCodeOutline} slot="icon-only" />
          </IonButton>
          <IonButton routerLink="/employee/status-member">
            <IonIcon icon={personOutline} slot="icon-only" />
          </IonButton>
          <IonButton routerLink="/employee/pos">
            <IonIcon icon={cardOutline} slot="icon-only" />
          </IonButton>
        </IonButtons>
      </IonToolbar>
    </IonFooter>
  );
};

export default Navbar;
