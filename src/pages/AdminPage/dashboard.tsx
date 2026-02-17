import React from "react";
import {
  IonPage,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonText,
} from "@ionic/react";
import { useHistory } from "react-router-dom";
import "./dashboard.css";

const Dashboard: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="page-container">
          <div className="dash-header">
            <IonText>
              <h1 className="dash-title">Admin Dashboard</h1>
              <p className="dash-subtitle">
                Overview of members, sales, staff, and equipment status.
              </p>
            </IonText>
          </div>

          {/* KPI Cards */}
          <IonGrid>
            <IonRow className="row-gap">
              <IonCol size="12" sizeMd="6" sizeLg="3">
                <IonCard className="kpi-card">
                  <IonCardHeader>
                    <IonCardTitle>Active Members</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="kpi-value">128</div>
                    <div className="kpi-note">+5 this week</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <IonCard className="kpi-card">
                  <IonCardHeader>
                    <IonCardTitle>Today Sales</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="kpi-value">$245</div>
                    <div className="kpi-note">Products + Walk-ins</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <IonCard className="kpi-card">
                  <IonCardHeader>
                    <IonCardTitle>Low Stock</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="kpi-value">3</div>
                    <div className="kpi-note">Need restock</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>

              <IonCol size="12" sizeMd="6" sizeLg="3">
                <IonCard className="kpi-card">
                  <IonCardHeader>
                    <IonCardTitle>Broken Equipment</IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="kpi-value">2</div>
                    <div className="kpi-note">Under maintenance</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>

          {/* Primary CTA (single) */}
          <IonCard className="hero-card">
            <IonCardHeader>
              <IonCardTitle>Quick Action</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                color="primary"
                className="primary-cta"
                onClick={() => history.push("/admin/customers")}
              >
                Add Customer
              </IonButton>
              <p className="helper-text">
                Create a customer profile and generate their QR identity.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Secondary actions */}
          <div className="section">
            <h2 className="section-title">Manage</h2>

            <IonGrid>
              <IonRow className="row-gap">
                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Customers</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/customers")}
                      >
                        View Customers
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Employees</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/employees")}
                      >
                        Manage Staff
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Products</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/products")}
                      >
                        Manage Products
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Equipment</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/equipment")}
                      >
                        Equipment Status
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Pricing</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/priceedit")}
                      >
                        Edit Prices
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Profile</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/admin/profile")}
                      >
                        View Profile
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>

          {/* Alerts */}
          <div className="section">
            <h2 className="section-title">Alerts</h2>

            <IonGrid>
              <IonRow className="row-gap">
                <IonCol size="12" sizeLg="6">
                  <IonCard className="list-card">
                    <IonCardHeader>
                      <IonCardTitle>Broken Equipment</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <ul className="simple-list">
                        <li>
                          Treadmill #2 <span className="pill pill-danger">Broken</span>
                        </li>
                        <li>
                          Bench Press #1{" "}
                          <span className="pill pill-warning">Maintenance</span>
                        </li>
                      </ul>

                      <IonButton
                        expand="block"
                        color="medium"
                        onClick={() => history.push("/admin/equipment")}
                      >
                        View Equipment
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeLg="6">
                  <IonCard className="list-card">
                    <IonCardHeader>
                      <IonCardTitle>Membership Expiring</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <ul className="simple-list">
                        <li>John D. — 3 days</li>
                        <li>Sarah K. — 5 days</li>
                      </ul>

                      <IonButton
                        expand="block"
                        color="medium"
                        onClick={() => history.push("/admin/customers")}
                      >
                        View Customers
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>
              </IonRow>
            </IonGrid>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Dashboard;
