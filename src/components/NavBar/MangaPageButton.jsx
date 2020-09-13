import React from "react";
import { connect } from "react-redux";

import IconButton from "../IconButton";
import If from "../../operator/If";
import { Link } from "react-router-dom";

const PlayButton = props => {

    const visible = props.tabsVisible[props.target] === true
    return (
        <If test={visible}>
            <Link to={`/manga/${props.selected._id}`}>
                <div className="manga-page-button">
                    <IconButton icon="book" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible, selected: state.manga.selected })

export default connect(mapStateToProps)(PlayButton);