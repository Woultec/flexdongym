import React, { useState } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonItem,
  IonLabel,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonText,
  IonIcon,
  useIonToast,
} from "@ionic/react";
import { saveOutline, refreshOutline } from "ionicons/icons";
import "./common.css";
import "./priceedit.css";

interface MembershipPrice {
  type: string;
  price: number;
  description: string;
  duration: string;
}

const PriceEdit: React.FC = () => {
  const [present] = useIonToast();

  const initialPrices: MembershipPrice[] = [
    {
      type: "Daily",
      price: 15,
      description: "Single day access",
      duration: "1 Day",
    },
    {
      type: "Weekly",
      price: 50,
      description: "7 days of unlimited access",
      duration: "7 Days",
    },
    {
      type: "Monthly",
      price: 150,
      description: "30 days of unlimited access",
      duration: "30 Days",
    },
    {
      type: "Quarterly",
      price: 400,
      description: "3 months of unlimited access",
      duration: "90 Days",
    },
    {
      type: "Yearly",
      price: 1200,
      description: "12 months of unlimited access",
      duration: "365 Days",
    },
  ];

  const [prices, setPrices] = useState<MembershipPrice[]>(initialPrices);
  const [hasChanges, setHasChanges] = useState(false);

  const handlePriceChange = (index: number, newPrice: string) => {
    const updatedPrices = [...prices];
    updatedPrices[index].price = parseFloat(newPrice) || 0;
    setPrices(updatedPrices);
    setHasChanges(true);
  };

  const handleSave = () => {
    // Here you would typically save to backend/database
    console.log("Saving prices:", prices);

    present({
      message: "Prices updated successfully!",
      duration: 2000,
      position: "top",
      color: "success",
    });

    setHasChanges(false);
  };

  const handleReset = () => {
    setPrices(initialPrices);
    setHasChanges(false);

    present({
      message: "Prices reset to default values",
      duration: 2000,
      position: "top",
      color: "medium",
    });
  };

  return (
    <IonPage className="admin-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Membership Pricing</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        {/* Header Section */}
        <div className="pricing-header">
          <IonText>
            <h2 className="page-title">Membership Pricing Tiers</h2>
            <p className="page-subtitle">
              Update pricing for different membership types
            </p>
          </IonText>
        </div>

        {/* Pricing Cards Grid */}
        <IonGrid>
          <IonRow className="pricing-row">
            {prices.map((membership, index) => (
              <IonCol
                key={membership.type}
                size="12"
                sizeMd="6"
                sizeLg="4"
              >
                <IonCard className="pricing-card">
                  <IonCardHeader className="pricing-card-header">
                    <div className="pricing-type-badge">
                      {membership.duration}
                    </div>
                    <IonCardTitle className="pricing-card-title">
                      {membership.type}
                    </IonCardTitle>
                    <p className="pricing-description">
                      {membership.description}
                    </p>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonItem lines="none" className="price-input-item">
                      <IonLabel position="stacked" className="price-label">
                        Price ($)
                      </IonLabel>
                      <IonInput
                        type="number"
                        value={membership.price}
                        onIonInput={(e) =>
                          handlePriceChange(index, e.detail.value!)
                        }
                        className="price-input"
                        min="0"
                        step="0.01"
                      />
                    </IonItem>
                    <div className="price-display">
                      ${membership.price.toFixed(2)}
                    </div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* Action Buttons */}
        <div className="pricing-actions">
          <IonCard className="actions-card">
            <IonCardContent>
              <div className="action-buttons">
                <IonButton
                  expand="block"
                  color="primary"
                  onClick={handleSave}
                  disabled={!hasChanges}
                  className="save-button"
                >
                  <IonIcon slot="start" icon={saveOutline} />
                  Save Changes
                </IonButton>
                <IonButton
                  expand="block"
                  color="medium"
                  fill="outline"
                  onClick={handleReset}
                  className="reset-button"
                >
                  <IonIcon slot="start" icon={refreshOutline} />
                  Reset to Default
                </IonButton>
              </div>
              {hasChanges && (
                <p className="unsaved-changes-text">
                  You have unsaved changes
                </p>
              )}
            </IonCardContent>
          </IonCard>
        </div>

        {/* Pricing Summary */}
        <IonCard className="summary-card">
          <IonCardHeader>
            <IonCardTitle>Pricing Summary</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <div className="summary-list">
              {prices.map((membership) => (
                <div key={membership.type} className="summary-item">
                  <span className="summary-type">{membership.type}</span>
                  <span className="summary-price">
                    ${membership.price.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
            <div className="summary-total">
              <span className="total-label">Total Revenue Potential:</span>
              <span className="total-value">
                ${prices.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
              </span>
            </div>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default PriceEdit;
