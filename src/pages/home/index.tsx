// create dashboard page component
import React from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import UserListing from "./UserListing";
import { ToastProvider } from 'react-toast-notifications';

const Home = () => {
  return (
    <>
      <ToastProvider>
        <UserListing />
      </ToastProvider>
    </>
  );
};

export default Home;