import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent
} from "@ionic/react";
import "./common.css";

const Equipment: React.FC = () => {
  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Equipment</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Equipment Management</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="text-secondary">Track equipment status, maintenance, and repairs.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Equipment;
