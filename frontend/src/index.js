import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { SendsContextProvider } from './context/SendsContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SendsContextProvider>
    <App />
    </SendsContextProvider>
  </React.StrictMode>
);