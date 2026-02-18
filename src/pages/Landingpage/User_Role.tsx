import React, { useState } from 'react';
import {
  IonPage,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonList,
  IonToast,
} from '@ionic/react';
import { shieldCheckmarkOutline, personOutline, close } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Username from '../../components/Reusable/Username';
import Password from '../../components/Reusable/Password';
import Button from '../../components/Reusable/Button';
import './User_Role.css';

const UserRole: React.FC = () => {
  const history = useHistory();
  const { login } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedRole, setSelectedRole] = useState<'admin' | 'employee' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRoleSelect = (role: 'admin' | 'employee') => {
    setSelectedRole(role);
    setShowModal(true);
  };

  const handleLogin = async () => {
    if (!username || !password || !selectedRole) {
      setToastMessage('Please fill in all fields');
      setShowToast(true);
      return;
    }

    setLoading(true);
    const success = await login(username, password, selectedRole);
    setLoading(false);

    if (success) {
      setShowModal(false);
      const path = selectedRole === 'admin' ? '/admin/dashboard' : '/employee/dashboard';
      history.push(path);
    } else {
      setToastMessage('Login failed. Please try again.');
      setShowToast(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setUsername('');
    setPassword('');
  };

  return (
    <IonPage>
      <IonContent className="role-selection-page" fullscreen>
        <div className="role-container">
          <div className="role-header">
            <h1>Select Your Role</h1>
            <p>Choose your access level to continue</p>
          </div>

          <div className="role-cards">
            <IonCard className="role-card admin-card" button onClick={() => handleRoleSelect('admin')}>
              <IonCardHeader>
                <div className="role-icon-wrapper admin-icon">
                  <IonIcon icon={shieldCheckmarkOutline} />
                </div>
                <IonCardTitle>Administrator</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Full system access with management capabilities</p>
                <ul className="role-features">
                  <li>Manage members & employees</li>
                  <li>View analytics & reports</li>
                  <li>Manage inventory & pricing</li>
                  <li>System configuration</li>
                </ul>
              </IonCardContent>
            </IonCard>

            <IonCard className="role-card employee-card" button onClick={() => handleRoleSelect('employee')}>
              <IonCardHeader>
                <div className="role-icon-wrapper employee-icon">
                  <IonIcon icon={personOutline} />
                </div>
                <IonCardTitle>Employee</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                <p>Daily operations and member services</p>
                <ul className="role-features">
                  <li>Member check-in & registration</li>
                  <li>Point of Sale (POS)</li>
                  <li>QR code scanning</li>
                  <li>View member details</li>
                </ul>
              </IonCardContent>
            </IonCard>
          </div>
        </div>

        {/* Login Modal */}
        <IonModal isOpen={showModal} onDidDismiss={handleCloseModal}>
          <IonHeader>
            <IonToolbar color="primary">
              <IonTitle>{selectedRole === 'admin' ? 'Admin' : 'Employee'} Login</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={handleCloseModal}>
                  <IonIcon icon={close} />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent className="login-modal-content">
            <div className="login-form">
              <IonList>
                <Username
                  value={username}
                  onChange={setUsername}
                  placeholder="Enter your username"
                  required
                />
                <Password
                  value={password}
                  onChange={setPassword}
                  placeholder="Enter your password"
                  required
                />
              </IonList>
              <div className="login-actions">
                <Button
                  text={loading ? 'Logging in...' : 'Login'}
                  onClick={handleLogin}
                  expand="block"
                  size="large"
                  disabled={loading}
                />
              </div>
            </div>
          </IonContent>
        </IonModal>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message={toastMessage}
          duration={3000}
          color="danger"
          position="top"
        />
      </IonContent>
    </IonPage>
  );
};

export default UserRole;
