import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { ProSidebarProvider } from "react-pro-sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <ProSidebarProvider>
        <App />
        <ToastContainer theme="dark" />
      </ProSidebarProvider>
    </HashRouter>
  </React.StrictMode>
);
