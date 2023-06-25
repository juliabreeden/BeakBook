import React, { useState } from 'react';
import App from './App';
import axios from "axios";

const SignUpForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      // Perform sign-up logic here
      axios.post('http://localhost:3000/home', newUser, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log('Sign up successful!');
      })
      .catch(error => {
        console.log('Error:', error);
      });
      console.log('Sign up successful!');
    } else {
      console.log('Passwords do not match!');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <form onSubmit={handleSignUp}>
        <label>
          Username:
          <input type="text" value={username} onChange={handleUsernameChange} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={handlePasswordChange} />
        </label>
        <br />
        <label>
          Confirm Password:
          <input type="password" value={confirmPassword} onChange={handleConfirmPasswordChange} />
        </label>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
