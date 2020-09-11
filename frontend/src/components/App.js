import React, { Component } from "react";
import { render } from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
  }

  componentDidMount() {
    fetch("api/characters")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
  }

  render() {
    return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    );
  }
}

class CharacterList extends Component {
    constructor(props) {
    super(props);
    this.state = {
      data: [],
      loaded: false,
      placeholder: "Loading"
    };
    }

    componentDidMount() {
    fetch("api/characters")
      .then(response => {
        if (response.status > 400) {
          return this.setState(() => {
            return { placeholder: "Something went wrong!" };
          });
        }
        return response.json();
      })
      .then(data => {
        this.setState(() => {
          return {
            data,
            loaded: true
          };
        });
      });
    }

    render() {
    return (
      <ul>
        {this.state.data.map(character => {
          return (
            <li key={character.char_name}>
                <h2>{character.char_name}</h2>
                <h3>{character.char_race}</h3>
            </li>
          );
        })}
      </ul>
    );
    }
}

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
        password: '',
        confirmPassword: '',
        passwordErrorMessage: '',
        redirect: false,
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

    handleConfirmPasswordChange(event) {
        this.setState({confirmPassword: event.target.value});
    }

  handleSubmit(event) {
    if(this.state.password !== this.state.confirmPassword) {
        this.setState({
            passwordErrorMessage: "Provided passwords do not match",
            password: "",
            confirmPassword: "",
            errorMessage: ""
        });
        event.preventDefault();
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.userName,
            password: this.state.password
        })
    };
    fetch('api/users/', requestOptions)
        .then(response => {
            console.log(requestOptions.body);
           // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const data =  response.json();
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            return response.json();
        })
        .then(data => this.setState({
            userName: '',
            password: '',
            confirmPassword: '',
            redirect: true
        }))
        .catch(error => {
            this.setState({ passwordErrorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/about'/>
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
        </label>
        <p>{this.state.passwordErrorMessage}</p>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <label>
          Confirm Password:
          <input type="text" value={this.state.confirmPassword} onChange={this.handleConfirmPasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        userName: '',
        password: '',
        passwordErrorMessage: '',
        redirect: false,
    };

    this.handleUserNameChange = this.handleUserNameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleUserNameChange(event) {
        this.setState({userName: event.target.value});
    }

    handlePasswordChange(event) {
        this.setState({password: event.target.value});
    }

  handleSubmit(event) {
    if(this.state.password !== this.state.confirmPassword) {
        this.setState({
            passwordErrorMessage: "Provided passwords do not match",
            password: "",
            errorMessage: ""
        });
        event.preventDefault();
        return;
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            username: this.state.userName,
            password: this.state.password
        })
    };
    fetch('api/users/', requestOptions)
        .then(response => {
            console.log(requestOptions.body);
           // check for error response
            if (!response.ok) {
                // get error message from body or default to response status
                const data =  response.json();
                const error = (data && data.message) || response.status;
                return Promise.reject(error);
            }
            return response.json();
        })
        .then(data => this.setState({
            userName: '',
            password: '',
            redirect: true
        }))
        .catch(error => {
            this.setState({ passwordErrorMessage: error.toString() });
            console.error('There was an error!', error);
        });
        event.preventDefault();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/about'/>
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Username:
          <input type="text" value={this.state.userName} onChange={this.handleUserNameChange} />
        </label>
        <p>{this.state.passwordErrorMessage}</p>
        <label>
          Password:
          <input type="text" value={this.state.password} onChange={this.handlePasswordChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}


function Home() {
    return (
        <div>
            <h2>Home</h2>
            <CreateAccount />
        </div>
    );
}


export default App;

const container = document.getElementById("app");
render(<App />, container);

