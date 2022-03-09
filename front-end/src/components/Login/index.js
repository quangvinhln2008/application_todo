import React, { useState, useEffect } from "react";

const Login = () => {
  return (
    <div className="box">
      <p className="box-title">TODO APP</p>
      <span className="box-decription">Enter your  to loggin</span>
      <div className="box-input">
        <label for="userName">Username</label>
        <input type="text" name="userName" id="userName"></input>
      </div>
    </div>
  );
}

export default Login;

