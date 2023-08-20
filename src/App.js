import React, { Component } from "react";
import "./App.css";

import ScryfallCards from "./components/ScryfallCards";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Cards</h1>
        <div className="header-bar" />
        <ScryfallCards />
      </div>
    );
  }
}

export default App;
