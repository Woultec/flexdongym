import React from 'react';
import { IonPage, IonContent } from '@ionic/react';
import { Route, Redirect } from 'react-router-dom';
import AdminNavbar from '../../components/admincomponents/Layout/Navbar';
import AdminHeader from '../../components/admincomponents/Layout/header';
import Dashboard from '../AdminPage/dashboard';
import Customers from '../AdminPage/customers';
import Employees from '../AdminPage/employees';
import Products from '../AdminPage/products';
import Equipment from '../AdminPage/equipment';
import PriceEdit from '../AdminPage/priceedit';
import Profile from '../AdminPage/profile';
import './admindashboard.css';

const AdminDashboardLayout: React.FC = () => {
  return (
    <>
      <AdminNavbar />
      <IonPage id="admin-content">
        <Route path="/admin/dashboard" exact component={Dashboard} />
        <Route path="/admin/customers" exact component={Customers} />
        <Route path="/admin/employees" exact component={Employees} />
        <Route path="/admin/products" exact component={Products} />
        <Route path="/admin/equipment" exact component={Equipment} />
        <Route path="/admin/price-edit" exact component={PriceEdit} />
        <Route path="/admin/profile" exact component={Profile} />
        <Route exact path="/admin">
          <Redirect to="/admin/dashboard" />
        </Route>
      </IonPage>
    </>
  );
};

export default AdminDashboardLayout;
