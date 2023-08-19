import React, { Component } from "react";
import "./App.css";

import Heroes from "./components/Heroes";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Cards</h1>
        <div className="header-bar" />
        <Heroes />
      </div>
    );
  }
}

export default App;
