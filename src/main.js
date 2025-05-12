import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter } from 'react-router-dom';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
