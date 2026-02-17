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

const Employees: React.FC = () => {
  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Employees</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Employee Management</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="text-secondary">Manage staff accounts, schedules, and permissions.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Employees;
