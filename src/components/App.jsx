import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import logo from '../logo-transparent-png.png';
import '../styles.css';
import CreateCard from './CreateCard';
import IdentifyBird from './IdentifyBird';
import Navbar from './NavBar';


import Home from './Home';
import LoginForm from './login';
import SignUpForm from './signup';
import Card from './Card';


const App = () => {

  const appStyles = {
    display: 'flex',
    background:'radial-gradient(circle at left top, #fdd9b5 , #a3ffff)',
    minHeight: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  }
  
  document.body.style.margin = '0';

  return (
    <div style={appStyles}>
      <div style={{ textAlign: 'center' }}>
        {/* <img src={logo} alt="Logo" style={{ width: '100px' }} /> */}
      </div>
      <Router>
        <RoutesWithNavbar style={{marginTop: '0px'}}/>
      </Router>
    </div>
  );
};

const RoutesWithNavbar = () => {
  const location = useLocation();
  const showNavbar = !['/', '/signup'].includes(location.pathname);

  return (
    <div>
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateCard />} />
        <Route path="/identify" element={<IdentifyBird />} />
        <Route path="/birdCards" element={<Card/>}/>
      </Routes>
    </div>
  );
};

export default App;



  