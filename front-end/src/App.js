import React, { Component } from "react";
import "./App.css";
import "./App.scss";

import Todo from "./components/Todo/index";
import Signin from "./pages/Signin/index";
import Signup from "./pages/Signup/index";
import Header from "./components/Header";
import Navigation from "./components/Navigation";
import MainContainer from "./components/MainContainer";

class App extends Component {
  render() {
    return (
      <div className="main-container">
        <Header />
        <div className="content">
          <Navigation />
          <MainContainer />
        </div>
      </div>
    );
  }
}

export default App;