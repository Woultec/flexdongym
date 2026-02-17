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

const Profile: React.FC = () => {
  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Admin Profile</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Profile Settings</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="text-secondary">Manage your admin account settings and preferences.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Profile;
