import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../logo-transparent-png.png';
import '../styles.css';

const Navbar = () => {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0px 30px',
    background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
    fontFamily:'Poppins',
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
  };

  const logoStyle = {
    fontSize: '24px',
    color: '#333',
  };

  const navLinkStyle = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '16px',
    marginLeft: '10px',
    marginRight: '10px',
  };

  return (
    <nav style={navStyle}>
      {/* <div style={logoStyle}>BeakBook</div> */}
      <img src={logo} alt="Logo" style={{ width: '100px' }} />
      <div>
        <Link to="/home" style={navLinkStyle}>Home</Link>
        <Link to="/birdCards" style={navLinkStyle}>My sightings</Link>
        <Link to="/create" style={navLinkStyle}>New Sighting</Link>
        <Link to="/identify" style={navLinkStyle}>Identify</Link>
        <Link to="/" style={navLinkStyle}>Sign out</Link>
      </div>
    </nav>
  );
};

export default Navbar;
