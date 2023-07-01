import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from '../logo-transparent-png.png';
import heroBackground from './heroBackground.jpg';



const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); 
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const signUpClick = () => {
    navigate('/signup')
  }

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      username: username,
      password: password,
    };

    axios
      .post('http://localhost:3000/login', user, {
        withCredentials: true,
      })
      .then(response => {
        console.log('Login successful!');
        navigate('/home');
      })
      .catch(error => {
        console.log('Login failed:', error);
        setLoginError(true); 
      });
  };

  const containerStyle = {
    backgroundImage: `url(${heroBackground})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center right',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  }

  const titleStyle = {
    fontSize: '48px', 
    marginTop: '0px',
    fontFamily: 'Poppins',
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

    // marginBottom: '20px'

  }


  // const usernameInputStyle = {
  //   width: '300px',  // Set the width as per your needs
  //   paddingLeft: '35px',  // Adjust the value as needed to prevent text overlaying the icon
  //   // backgroundImage: 'url(.../userIcon)',
  //   // backgroundRepeat: 'no-repeat',
  //   // backgroundPosition: '7px center', 
  //   // backgroundSize: '2px'// Adjust as needed to position the icon correctly
  // };
  
 
  const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  };
  


  const signUpContainerStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '10px',
  };

  const signUpTextStyles = {
    fontFamily: 'Poppins',
    fontSize: '12px',
    marginRight: '10px',
    maxWidth: '60px'
  };

  const signUpButtonStyles = {
    fontFamily: 'Poppins',
    paddingLeft: '10px',
    height: '30px', 
    backgroundColor:'#86f9f9',
    cursor:'pointer'
  };

  return (
    <div
      style={containerStyle}
    >
         <img src={logo} alt="Logo" style={{ width: '100px',  position: 'fixed',
    top: '0',
    left: '0',
    right: '0', width: '150px', height: '28px'}} />
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
        <h1 style={titleStyle}>Login</h1> 
        <h2 style={h2Style}>to view BeakBook and track your bird sightings</h2>
        {loginError && <p style={{ color: 'red' }}>Invalid login information. Please try again or <a href="/signup">sign up</a>.</p>}
        <form style={formStyle} onSubmit={handleLogin}>
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
          <button style={{cursor: 'pointer', height: '35px', fontFamily: 'Poppins', width: '200px'}}type="submit">Log in</button>
        </form>
        <div style={signUpContainerStyle}>
            <p style={signUpTextStyles}>Not a user yet?</p>
            <button style={signUpButtonStyles} onClick={signUpClick}>Sign up</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
