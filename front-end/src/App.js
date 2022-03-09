import React, { Component} from "react";
import "./App.css";
import "./App.scss";

import Todo from "./components/Todo/index";
import Login from "./components/Login/index";

class App extends Component{
  render(){
    return(
      <>
        <Login />
      </>
    );
  }
}

export default App;