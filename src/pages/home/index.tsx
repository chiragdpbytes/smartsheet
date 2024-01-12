// create dashboard page component
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';
import UserListing from "./UserListing";
import { ToastProvider } from 'react-toast-notifications';
import apiService from '../../api-config/services/Rap.service';

const Home = () => {
  
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchData();
    setLoading(false);
}, []);

useEffect(() => {
  setLoading(true);
  const refSite = document.referrer;
  console.log('document.referrer', document.referrer);
  if (data.length > 0 && refSite) {
    const isWhitelisted = data.some((item) => {
      return refSite.includes(item.websiteHostName);
    });
    if (!isWhitelisted) {
      setError('You are not allowed to access this website');
    }
  }
  setLoading(false);
}, [data]);


const fetchData = async () => {
  setLoading(true);
    try {
        const response = await apiService.get('/whitelist-website');
        if(response.data.statusCode === 200){
          setData(response.data.data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
    setLoading(false);
};
  return (
    <>
      <ToastProvider>
        {
          error ? (
            <div className="error">
              <p>{error}</p>
            </div>
          ) : 
          loading ? (
            <div className="loading">
              <p>Loading...</p>
            </div>
          ) : (
            <UserListing />
          )
        }
        
      </ToastProvider>
    </>
  );
};

export default Home;