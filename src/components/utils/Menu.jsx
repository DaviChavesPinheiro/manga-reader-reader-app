import React from "react";

import "./Menu.css";

const Menu = props => {

    return (
        <div className={`menu ${props.show ? 'show' : ''}`}>
            <button className="close" onClick={props.onClose}>&times;</button>
            {props.children}
        </div>
    )
}

export default Menu;