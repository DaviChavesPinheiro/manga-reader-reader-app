import React from "react";
import { connect } from "react-redux";


const Display = props => {

    return (
        <div className="display">
            {props.displayLabel}
        </div>
    )
}

const mapStateToProps = state => ({displayLabel: state.navBar.displayLabel})

export default connect(mapStateToProps)(Display);