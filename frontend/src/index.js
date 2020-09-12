import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import { render } from "react-dom";
import App from "./Components/App";

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
