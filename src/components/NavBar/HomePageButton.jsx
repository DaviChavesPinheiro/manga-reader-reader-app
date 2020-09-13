import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import IconButton from "../IconButton";
import If from "../../operator/If";

const HomePageButton = props => {
    const visible = props.tabsVisible[props.target] === true
    return (
        <If test={visible}>
            <Link to="/">
                <div className="home-page-button">
                    <IconButton icon="home" label={props.label}></IconButton>
                </div>
            </Link>
        </If>
    )
}
const mapStateToProps = state => ({ tabsVisible: state.navBar.tabsVisible })

export default connect(mapStateToProps)(HomePageButton);