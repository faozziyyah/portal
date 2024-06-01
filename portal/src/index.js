import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { HashRouter } from 'react-router-dom'
import { ProSidebarProvider } from "react-pro-sidebar";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProfileProvider } from './UserProfileContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <UserProfileProvider>
        <ProSidebarProvider>
          <App />
          <ToastContainer theme="dark" />
        </ProSidebarProvider>
      </UserProfileProvider>
    </HashRouter>
  </React.StrictMode>
);
