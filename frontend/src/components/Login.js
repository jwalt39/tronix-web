import React, { Component } from "react";
import { render } from "react-dom";

class Login extends Component {
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

export default Login;

const container = document.getElementById("login");
render(<Login />, container);