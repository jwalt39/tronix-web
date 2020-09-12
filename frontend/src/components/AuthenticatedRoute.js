import Cookies from "js-cookie";
import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  useHistory,
  withRouter,
} from "react-router-dom";

export const getAccessToken = () => Cookies.get("access_token");
export const getRefreshToken = () => Cookies.get("refresh_token");
export const isAuthenticated = () => !!getAccessToken();

function refreshTokens() {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refresh: getRefreshToken(),
    }),
  };
  return fetch("token/refresh/", requestOptions)
    .then((response) => {
      console.log(requestOptions.body);
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.error("There was an error!", error);
    });
}

function setTokens(access_token, refresh_token) {
  const expires = (tokens.expires_in || 60 * 60) * 1000;
  const inOneHour = new Date(new Date().getTime() + expires);

  // you will have the exact same setters in your Login page/app too
  Cookies.set("access_token", tokens.access_token, { expires: inOneHour });
  Cookies.set("refresh_token", tokens.refresh_token);
}

const authenticate = async (history) => {
  if (getRefreshToken()) {
    try {
      const tokens = await refreshTokens(); // call an API, returns tokens

      setTokens(tokes.access_token, getRefreshToken());
      return true;
    } catch (error) {
      history.push("/login");
      return false;
    }
  }

  history.push("/login");
  return false;
};

class AuthenticateBeforeRender extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: false,
    };
  }

  componentDidMount() {
    authenticate(this.props.history).then((isAuthenticated) => {
      this.setState({ isAuthenticated });
    });
  }

  componentWillUnmount() {
    // fix Warning: Can't perform a React state update on an unmounted component
    this.setState = (state, callback) => {
      return;
    };
  }

  render() {
    return this.state.isAuthenticated ? this.props.render() : null;
  }
}

const WrappedThingy = withRouter(AuthenticateBeforeRender);

const AuthenticatedRoute = ({ component: Component, exact, path }) => (
  <Route
    exact={exact}
    path={path}
    render={(props) =>
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <WrappedThingy render={() => <Component {...props} />} />
      )
    }
  />
);

export default AuthenticatedRoute;
