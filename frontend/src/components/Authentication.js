import Cookies from "js-cookie";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
} from "react-router-dom";
import { setTokens } from "./AuthenticatedRoute";

import AuthenticatedRoute from "./AuthenticatedRoute";
export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      passwordErrorMessage: "",
      redirect: false,
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleUserNameChange(event) {
    this.setState({ userName: event.target.value });
  }

  handlePasswordChange(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.userName,
        password: this.state.password,
      }),
    };
    fetch("token/obtain/", requestOptions)
      .then((response) => {
        console.log(requestOptions.body);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const data = response.json();
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
        return response.json();
      })
      .then((data) => {
        setTokens(data.access, data.refresh);
      })
      .catch((error) => {
        this.setState({ passwordErrorMessage: error.toString() });
        console.error("There was an error!", error);
      });
    event.preventDefault();
  }

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Username:
            <input
              type="text"
              value={this.state.userName}
              onChange={this.handleUserNameChange}
            />
          </label>
          <p>{this.state.passwordErrorMessage}</p>
          <label>
            Password:
            <input
              type="text"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
