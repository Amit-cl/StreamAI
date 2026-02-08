import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.jsx'
import appStore from './utils/appStore'
import React from "react";
import ReactDOM from "react-dom/client";


import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
 
     <StrictMode>
        <Provider store={appStore}>
          <App />
        </Provider>
      </StrictMode>
  
);
