import React, { Component } from "react";
import "./App.css";
import axios from "axios";

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  }
  async componentDidMount() {
    const projects = await axios.get("http://localhost:5000/projects");
    try {
      this.setState({
        projects: projects.data
      });
    } catch (err) {
      console.log("it failed");
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">{}</header>
      </div>
    );
  }
}

export default App;
