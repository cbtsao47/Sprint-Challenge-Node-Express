import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import Project from "./components/Project";

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
      return err;
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          {this.state.projects.map(project => (
            <Project key={project.id} project={project} />
          ))}
        </header>
      </div>
    );
  }
}

export default App;
