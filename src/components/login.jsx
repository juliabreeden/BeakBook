import React from "react";
import App from "./App";
// import React, {useState} from 'react';

const LoginForm = () => {
  // const [input, setInput] = useState({
  //   username: '',
  //   password:''
  // })
  // function handleChange (event) {
  //   const {name, value} = event.target

  //   setInput()
  // }
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
          <h2>Login</h2>
          {/* <a href='/'></a> */}
          <form>
            <div>
              <label htmlFor="username">Username:</label>
              <input  type="text" id="username" name="username" />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input  type="password" id="password" name="password" />
            </div>
            <button  type="submit">Submit</button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginForm;