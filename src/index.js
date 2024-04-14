import React from "react";
import ReactDOM from "react-dom/client"; 
import App, { Test } from "./App";
import "./index.css";
import MyProvider from "./store/auth-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <MyProvider>
      <App />
    </MyProvider>
  );
