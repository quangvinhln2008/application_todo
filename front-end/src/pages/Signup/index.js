import React, { useState, useEffect } from "react";

const Signup = () => {
    return (
        <form className="box box_signup" method="POST">
            <p className="box-title">TODO APP</p>
            <span className="box-decription">Create an account</span>
            <div className="box-input">
                <label for="userName">User name:</label>
                <input type="text" name="userName" id="userName"></input>
            </div>
            <div className="box-input">
                <label for="email">Email:</label>
                <input type="text" name="email" id="email"></input>
            </div>
            <div className="box-input">
                <label for="password">Password:</label>
                <input type="text" name="password" id="password"></input>
            </div>
            <div className="button-group">
                <button className="button button_signin">Sign Up</button>
                <div className="link-group">
                    <a href="#">Sign in to your account</a>                   
                </div>
            </div>
        </form>
    );
};

export default Signup;
