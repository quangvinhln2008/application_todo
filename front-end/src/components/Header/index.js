import React, { useState, useEffect } from "react";
import ProfileHeader from "../ProfileHeader";
import Signout from "../Signout";

const Header = () => {
    return (
        <>
        <div className="header">
            <h1 className="title">TODO APP</h1>
            <ProfileHeader />
            <Signout />
        </div>
        </>
    );
};

export default Header;
