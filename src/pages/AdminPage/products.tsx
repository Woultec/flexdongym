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

const Products: React.FC = () => {
  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Products</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Product Management</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <p className="text-secondary">Manage inventory, sales, and product catalog.</p>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default Products;
