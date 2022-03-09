import React, { useState, useEffect } from "react";

const Signin = () => {
  return (
    <form className="box" method="POST">
      <h1 className="box-title">TODO APP</h1>  
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
        <button className="button button_signin">Sign In</button>
        <div className="link-group">
          <a href="#">Forgot password</a>
          <span>
            You don't have account? <a href="#">Sign up here</a>
          </span>
        </div>
      </div>
    </form>
  );
};

export default Signin;
