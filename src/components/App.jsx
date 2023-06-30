import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import logo from '../logo-transparent-png.png';


import Home from './Home';
import LoginForm from './login';
import SignUpForm from './signup';


const App = () => {
  const appStyles = {
    background:'radial-gradient(circle at left top, #fdd9b5 , #a3ffff)',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };
  
  document.body.style.margin = '0';

  return (
  <>
   <div style={{ textAlign: 'center' }}>
      <img src={logo} alt="Logo" style={{ width: '100px' }} />
      </div>
    <Router>
      <div style={appStyles}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
   </>
  );
};

export default App;
