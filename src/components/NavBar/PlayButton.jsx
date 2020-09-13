import React from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";

const PlayButton = props => {
    const visible = props.tabsVisible[props.target] === true
    return (
        <If test={visible}>
                <div className="play-button">
                    <IconButton icon="play" label={props.label}></IconButton>
                </div>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(PlayButton);