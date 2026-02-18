import React from 'react';
import { IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/react';
import {
  speedometerOutline,
  peopleOutline,
  qrCodeOutline,
  cartOutline,
  personAddOutline,
  logOutOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import './Navbar.css';

const EmployeeNavbar: React.FC = () => {
  const history = useHistory();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <IonTabBar slot="bottom" className="employee-tabbar">
      <IonTabButton tab="dashboard" href="/employee/dashboard">
        <IonIcon icon={speedometerOutline} />
        <IonLabel>Dashboard</IonLabel>
      </IonTabButton>

      <IonTabButton tab="members" href="/employee/members">
        <IonIcon icon={peopleOutline} />
        <IonLabel>Members</IonLabel>
      </IonTabButton>

      <IonTabButton tab="qr-scanner" href="/employee/qr-scanner" className="qr-tab-button">
        <IonIcon icon={qrCodeOutline} />
        <IonLabel>Scan QR</IonLabel>
      </IonTabButton>

      <IonTabButton tab="pos" href="/employee/pos">
        <IonIcon icon={cartOutline} />
        <IonLabel>POS</IonLabel>
      </IonTabButton>

      <IonTabButton tab="register" href="/employee/status-member">
        <IonIcon icon={personAddOutline} />
        <IonLabel>Register</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};

export default EmployeeNavbar;
