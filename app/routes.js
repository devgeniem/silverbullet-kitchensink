import React from 'react';
import { Route, Router, IndexRoute } from 'react-router';

import Layout from './layout';
import Login from './pages/login';
import Dashboard from './pages/dashboard/dashboard';
import CustomerList from './pages/customer/customer-list';
import AddNewCustomer from './pages/customer/add-new-customer';
import CustomerProfile from './pages/customer/customer-profile';
import OrderList from './pages/customer/order-list';
import AddNewOrder from './pages/customer/add-new-order';
import OrderProfile from './pages/customer/order-profile';
import ProjectList from './pages/customer/project-list';
import AddNewProject from './pages/customer/add-new-project';
import ProjectProfile from './pages/customer/project-profile';
import MaintenanceList from './pages/customer/maintenance-list';
import AddNewMaintenance from './pages/customer/add-new-maintenance';
import MaintenanceProfile from './pages/customer/maintenance-profile';
import InsourcingList from './pages/customer/insourcing-list';
import AddNewInsourcing from './pages/customer/add-new-insourcing';
import InsourcingProfile from './pages/customer/insourcing-profile';
import Settings from './pages/settings/settings';
import NotFound from './pages/404';

// Add the reducer to your store on the `routing` key
export default (
  <Router>
    <Route path="/" component={Layout}>
      <IndexRoute component={Login} />
      <Route path="dashboard" component={Dashboard} />
      <Route path="customers" component={CustomerList} />
      <Route path="customer/new" component={AddNewCustomer} />
      <Route path="customer/:id" component={CustomerProfile} />
      <Route path="orders" component={OrderList} />
      <Route path="order/new" component={AddNewOrder} />
      <Route path="order/:id" component={OrderProfile} />
      <Route path="projects" component={ProjectList} />
      <Route path="project/new" component={AddNewProject} />
      <Route path="project/:id" component={ProjectProfile} />
      <Route path="maintenances" component={MaintenanceList} />
      <Route path="maintenance/new" component={AddNewMaintenance} />
      <Route path="maintenance/:id" component={MaintenanceProfile} />
      <Route path="insourcings" component={InsourcingList} />
      <Route path="insourcing/new" component={AddNewInsourcing} />
      <Route path="insourcing/:id" component={InsourcingProfile} />
      <Route path="settings/:page" component={Settings} />
      {/*<Route path="customers" component={Customers} />
      <Route path="customers/orders" component={OrganizationList} />
      <Route path="organization/:id" component={Organization} />
      <Route path="user/:id" component={User} />
      <Route path='register/:id/:activationCode' component={UserRegister} />*/}
      <Route path="*" component={NotFound} />
    </Route>
  </Router>
);
