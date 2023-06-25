import React from "react";
import ReactDom from "react-dom";
import LoginForm from "./login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home'
import AddCard from './AddCard'
import SignupForm from './signup';

const App = () => {
    const h1Style = {
        position: 'absolute',
        top: 0,
        left: 0,
      };
    return (
    <>
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<LoginForm/>} />
        <Route path='/signup' element={<SignupForm/>}/>
        <Route path='/home' element = {<Home/>}/>
        <Route path='/add' element = {<AddCard/>}/>
        {/* <Route exact path="/homepage" component={Homepage} /> */}
    </Routes>
    </BrowserRouter>
    <div>
    <h1 style={h1Style}>BeakBook</h1>
    </div>
    </>
    );
}

export default App;