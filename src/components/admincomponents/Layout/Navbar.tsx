import React from "react";
import {
  IonMenu,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
} from "@ionic/react";
import "./Navbar.css";

const Navbar: React.FC<{ contentId?: string }> = ({ contentId = "admin-content" }) => {
  return (
    <IonMenu contentId={contentId} type="overlay">
      <IonContent>
        <IonList>
          <IonItem routerLink="/admin/dashboard" routerDirection="root">
            <IonLabel>Dashboard</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/customers" routerDirection="root">
            <IonLabel>Customers</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/employees" routerDirection="root">
            <IonLabel>Employees</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/products" routerDirection="root">
            <IonLabel>Products</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/equipment" routerDirection="root">
            <IonLabel>Equipment</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/priceedit" routerDirection="root">
            <IonLabel>Price Edit</IonLabel>
          </IonItem>
          <IonItem routerLink="/admin/profile" routerDirection="root">
            <IonLabel>Profile</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Navbar;
