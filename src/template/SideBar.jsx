import React from "react";
import "./SideBar.css";

const SideBar = props => {

    return (
        <div className={`side-bar ${props.side}`}>
            {props.children}
        </div>
    )
}

export default SideBar;