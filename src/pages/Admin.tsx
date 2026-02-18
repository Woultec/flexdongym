import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import AdminDashboardLayout from './Layout/admindashboard';

const Admin: React.FC = () => {
  return (
    <IonReactRouter>
      <Route path="/admin" component={AdminDashboardLayout} />
      <Redirect exact from="/admin" to="/admin/dashboard" />
    </IonReactRouter>
  );
};

export default Admin;
