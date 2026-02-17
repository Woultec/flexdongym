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
import "./EmployeeDashboard.css";

const EmployeeDashboard: React.FC = () => {
  const history = useHistory();

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="page-container">
          <div className="dash-header">
            <IonText>
              <h1 className="dash-title">Employee Dashboard</h1>
              <p className="dash-subtitle">
                Scan a member QR to check status quickly.
              </p>
            </IonText>
          </div>

          {/* Primary CTA (only one) */}
          <IonCard className="hero-card">
            <IonCardHeader>
              <IonCardTitle>Scan Member</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonButton
                expand="block"
                color="primary"
                className="scan-btn"
                onClick={() => history.push("/employee/qr")}
              >
                Open QR Scanner
              </IonButton>
              <p className="helper-text">
                Tip: Keep the camera steady and align the QR code inside the frame.
              </p>
            </IonCardContent>
          </IonCard>

          {/* Secondary actions */}
          <div className="section">
            <h2 className="section-title">Actions</h2>

            <IonGrid>
              <IonRow className="row-gap">
                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Status</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/employee/status-member")}
                      >
                        View Member Status
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>POS</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/employee/pos")}
                      >
                        Open POS
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Prepaid</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/employee/prepaid")}
                      >
                        Manage Prepaid
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Walk-in</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/employee/walkin")}
                      >
                        New Walk-in
                      </IonButton>
                    </IonCardContent>
                  </IonCard>
                </IonCol>

                <IonCol size="12" sizeMd="6" sizeLg="4">
                  <IonCard className="action-card">
                    <IonCardHeader>
                      <IonCardTitle>Add Member</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonButton
                        expand="block"
                        fill="outline"
                        color="primary"
                        onClick={() => history.push("/employee/member")}
                      >
                        Create Member
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

export default EmployeeDashboard;
