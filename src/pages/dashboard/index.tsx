// create dashboard page component
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import UserListing from "./UserListing";
import { ToastProvider } from 'react-toast-notifications';

const Dashboard = () => {
  return (
    <section>
      <ToastProvider>
        <UserListing />
      </ToastProvider>
    </section>
  );
};

export default Dashboard;