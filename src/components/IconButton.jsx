import React from "react";
import "./IconButton.css";

const IconButton = props => {

    return (
        <button className="icon-button">
            <i className={`fa fa-${props.icon}`}></i>
            <p className="label">{props.label}</p>
        </button>
    )
}

export default IconButton;