import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Header from "./containers/Header";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <App />
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
