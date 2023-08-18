import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import logo from '../logo-transparent-png.png';
import heroBackground from './heroBackground.jpg';

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [signUpError, setSignUpError] = useState(false);

  const navigate = useNavigate(); 

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      password: password,
      _id: Math.random(48463)
    }
    if (password === confirmPassword) {
      axios.post('http://localhost:3000/home', newUser, { headers: { 'Content-Type': 'application/json' }, withCredentials: true, overwrite: true })
        .then(response => {
          console.log('Sign up successful!');
          navigate('/home'); 
        })
        .catch(error => {
          console.log('Error:', error);
        });
    } else {
      setSignUpError(true);
      console.log('Passwords do not match!');
    }
  };

  const titleStyle = {
    fontSize: '48px', 
    marginTop: '0px',
    fontFamily: 'Montseratt',
    marginBottom: '2px'   
  };

  const h2Style = {
    fontSize: '10px',
    marginTop: '0px',
    fontFamily: 'Poppins'
  }

  const inputIcon = {
    position: 'relative',
    display: 'inline-block',
    width: '200px',
    marginBottom: '15px',
    margninTop: '20px'
  }

  const iconStyle = {
    position: 'absolute',
    display: 'block',
    left: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  }

  const inputStyle = {
    paddingLeft: '30px',
    height: '30px',
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'Varela Round'
  }

  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${heroBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center right',
        height: '100vh',
        width: '100vw',
        
      }}
    >
      <div style={{ 
        textAlign: 'center',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        margin: '10px',
        paddingTop: '20px',
        paddingBottom: '30px',
        paddingRight: '40px',
        paddingLeft: '40px',
        background: 'radial-gradient(circle at right bottom, #ffe0c2 , #c2ffff)',
        }}>
        <h1 style={titleStyle}>Sign Up</h1> 
        <h2 style={h2Style}>to start tracking your bird sightings on BeakBook</h2>
        {signUpError && <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>}
        <form style={formStyle} onSubmit={handleSignUp}>
          <div style={inputIcon}>
            <i className="fas fa-user" style={iconStyle}></i>
            <label htmlFor="username"></label>
            <input style={inputStyle} type="text" id="username" name="username" placeholder='@Username'value={username} onChange={handleUsernameChange} />
          </div>
          <div style={inputIcon}>
            <i className="fas fa-lock" style={iconStyle}></i>
            <label htmlFor="password"></label>
            <input style={inputStyle} type="password" id="password" name="password" placeholder='Password' value={password} onChange={handlePasswordChange} />
          </div>
          <div style={inputIcon}>
            <i className="fas fa-lock" style={iconStyle}></i>
            <label htmlFor="confirmPassword"></label>
            <input style={inputStyle} type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password' value={confirmPassword} onChange={handleConfirmPasswordChange} />
          </div>
          <button style={{cursor: 'pointer', height: '35px', fontFamily: 'Poppins', width: '200px'}}type="submit">Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
