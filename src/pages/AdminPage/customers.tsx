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

const Customers: React.FC = () => {
  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Customers</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Customer Management</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="text-secondary">Track and manage all gym members and their subscriptions.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Customers;
