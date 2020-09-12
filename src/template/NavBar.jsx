import React from "react";
import "./NavBar.css";

const NavBar = props => {

    return (
        <div className={`nav-bar ${props.position}`}>
            {props.children}
        </div>
    )
}

export default NavBar;