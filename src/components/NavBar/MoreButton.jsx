import React from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";

const MoreButton = props => {
    const visible = props.tabsVisible[props.target] === true
    return (
        <If test={visible}>
            <div className="more-button">
                <IconButton icon="navicon" label={props.label}></IconButton>
            </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(MoreButton);