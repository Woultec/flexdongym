import React from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";

const POS: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonTitle>POS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        POS screen (placeholder)
      </IonContent>
    </IonPage>
  );
};

export default POS;
