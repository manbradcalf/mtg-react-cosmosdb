import React, { Component } from "react";
import "./App.css";

import ScryfallCards from "./components/ScryfallCards";
import SearchBar from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Cards</h1>
        <div className="header-bar" />
        <SearchBar />
        <ScryfallCards />
      </div>
    );
  }
}

export default App;
