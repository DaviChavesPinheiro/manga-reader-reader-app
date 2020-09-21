import React from "react";
import "./Loading.css";

const Loading = props => {

    return (
        <div className="loader" style={{height: props.height, width: props.width}}>
            <i className="fa fa-circle-o-notch" style={{color: props.color, fontSize: props.fontSize}}></i>
        </div>
    )
}

export default Loading;