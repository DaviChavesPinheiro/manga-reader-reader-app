import React from "react";
import "./IconButton.css";

const IconButton = props => {

    return (
        <button className="icon-button">
            <i className={`fa fa-${props.icon}`}></i>
            {props.children}
        </button>
    )
}

export default IconButton;