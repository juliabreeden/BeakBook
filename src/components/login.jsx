import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false); // State for login error
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

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
        setLoginError(true); // Set login error to true
      });
  };

  const titleStyle = {
    fontSize: '48px', // Change the font family to 'Comic Sans MS'
    marginTop: '50px', // Adjust the margin-top to move the title higher
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <h1 style={titleStyle}>BeakBook</h1> {/* Updated title with new font and position */}
        <h2>Login</h2>
        {loginError && <p style={{ color: 'red' }}>Invalid login information. Please try again or <a href="/signup">sign up</a>.</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" value={username} onChange={handleUsernameChange} />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" value={password} onChange={handlePasswordChange} />
          </div>
          <button type="submit">Submit</button>
        </form>
        <p>Not a registered user? <a href="/signup">Sign up</a>.</p>
      </div>
    </div>
  );
};

export default LoginForm;
