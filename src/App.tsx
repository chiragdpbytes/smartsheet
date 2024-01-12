import React from 'react';
import './config/axios.config';
import { BrowserRouter } from 'react-router-dom';
import AppRouting from './routing/AppRouting';

function App() {

  console.log(window.location.href);
  console.log('window.self', window.self);
  console.log('window.parent', window.parent.location);
  console.log('window.top', window.top);
  console.log('document.referrer', document.referrer);
  const refSite = document.referrer;

  return (
    <>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </>
  );
}

export default App;
