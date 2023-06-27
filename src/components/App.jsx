import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import your components
import Home from './Home';
import LoginForm from './login';
import SignUpForm from './signup';

const App = () => {
  const appStyles = {
    backgroundColor: '#99ebeb',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <Router>
      <div style={appStyles}>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
