import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

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

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
      {signUpError && <p style={{ color: 'red' }}>Passwords do not match. Please try again.</p>}
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
    </div>
  );
};

export default SignUpForm;
