import React, { useState, useEffect } from "react";

const Login = () => {
  return (
    <form className="box" method="POST">
      <p className="box-title">TODO APP</p>
      <span className="box-decription">Enter your account to loggin</span>
      <div className="box-input">
        <label for="email">Email:</label>
        <input type="text" name="email" id="email"></input>
      </div>
      <div className="box-input">
        <label for="password">Password:</label>
        <input type="text" name="password" id="password"></input>
      </div>
      <div className="button-group">
        <button className="button signin">Sign In</button>
        <div className="link-group">
          <a>Forgot password</a>
          <span>
            You don't have account? <a>Create new account</a>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Login;
