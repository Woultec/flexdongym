import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Route, Redirect } from 'react-router-dom';
import EmployeeDashboardLayout from './Layout/employeedashboard';

const Employee: React.FC = () => {
  return (
    <IonReactRouter>
      <Route path="/employee" component={EmployeeDashboardLayout} />
      <Redirect exact from="/employee" to="/employee/dashboard" />
    </IonReactRouter>
  );
};

export default Employee;
