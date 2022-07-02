import React from "react";
import {
    BrowserRouter
  } from 'react-router-dom';
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import * as ReactDOMClient from "react-dom/client";

const container = document.getElementById("root");

// Create a root.
const root = ReactDOMClient.createRoot(container);

root.render( <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
