import React from 'react';
import './config/axios.config';
import { BrowserRouter } from 'react-router-dom';
import AppRouting from './routing/AppRouting';

function App() {

  return (
    <>
      <BrowserRouter>
        <AppRouting />
      </BrowserRouter>
    </>
  );
}

export default App;
