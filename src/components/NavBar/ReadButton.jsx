import React from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";
import { Link } from "react-router-dom";

const ReadButton = props => {
    const visible = props.tabsVisible[props.target] === true

    return (
        <If test={visible}>
            <Link to={`/manga/${props.selected._id}/chapters/${0}`}>
                <div className="read-button" >
                    <IconButton icon="play" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, selected: state.manga.selected })

export default connect(mapStateToProps)(ReadButton);