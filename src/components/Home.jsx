import React from 'react';
import { useNavigate } from 'react-router-dom';
import heroBackground from './heroBackground.jpg';
import '../styles.css';

const Home = () => {
  const navigate = useNavigate();

  const heroContainerStyle = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    backgroundPosition: 'center right',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: '0 20px',
  };

  const titleStyle = {
    fontSize: '36px',
    fontWeight: 'bolder',
    marginBottom: '20px',
    fontFamily: 'Lato',
    color: 'white',
    whiteSpace: 'pre-wrap',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const buttonStyle = {
    cursor: 'pointer',
    height: '40px',
    fontFamily: 'Poppins',
    fontWeight: 'bolder',
    width: '170px',
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    border: 'none',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    backgroundColor: '#b8ffff',
  };

  const buttonStyleHome = {
    cursor: 'pointer',
    height: '40px',
    fontFamily: 'Poppins',
    fontWeight: 'bolder',
    width: '170px',
    marginTop: '10px',
    marginRight: '10px',
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#ffe0c2',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    // backgroundColor: 'white',
  };

  const heroContentStyle = {
    marginTop: '70px',
    marginLeft: '80px',

  }

  const handleCreateCardClick = () => {
    // Logic to handle the click on "Log your first entry" button
    navigate('/create');
  };

  const handleAddSightingClick = () => {
    // Logic to handle the click on "Log a new sighting" button
    navigate('/create');
  };

  const handleVisitHomeClick = () => {
    // Logic to handle the click on "Visit Home" button
    navigate('/main');
  };

  return (
    <div style={heroContainerStyle}>
      <div style={heroContentStyle}>
      <div style={titleStyle}>
        Identify. Track. Soar with Your {'\n'}BeakBook.
      </div>
      <button style={buttonStyle} onClick={handleAddSightingClick}>
        Log a new sighting
      </button>
      <button style={buttonStyleHome} onClick={handleVisitHomeClick}>
        Visit Home
      </button>
    </div>
    </div>
  );
};

export default Home;
