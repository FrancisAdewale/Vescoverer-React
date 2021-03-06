import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Register from './Register';
import Login from "./componenets/Login";
import Dashboard from "./Dashboard"
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";



ReactDOM.render(

  <BrowserRouter>
  <Routes>
    <Route path="/" element={<App />} />
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />}/>
    <Route path="dashboard" element={<Dashboard />} />
  </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
